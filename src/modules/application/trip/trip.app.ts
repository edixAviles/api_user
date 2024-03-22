import { ObjectId } from "mongodb"
import ApplicationService from "api_utility/src/application/application_service"
import TransactionSession from "api_utility/src/database/transaction_session"
import Response from "api_utility/src/response/response"
import ResponseManager from "api_utility/src/response/response_manager"
import ServiceException from "api_utility/src/exception/service_exception"
import ServiceError from "api_utility/src/error/service_error"
import MediaTypeNames from "api_utility/src/consts/media_type_names"

import IInvoiceInsert from "../../contracts/invoice/invoice.insert"
import ITripInsert from "../../contracts/trip/trip.insert"
import InvoiceManager from "../../domain/invoice/invoice.manager"
import Trip from "../../domain/trip/trip.entity"
import TripManager from "../../domain/trip/trip.manager"
import TripUserManager from "../../domain/trip/tripUser.manager"
import UserManager from "../../domain/user/user.manager"
import VehicleManager from "../../domain/vehicle/vehicle.manager"
import InvoiceErrorCodes from "../../shared.domain/invoice/invoice.error.codes"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"
import LocalizeError from "../../shared/localize_error"

import { mapper } from "../../../core/mappings/mapper"
import { TripDto, TripsAvailablesDto } from "../../contracts/trip/trip.dto"
import { ITripCancel } from "../../contracts/trip/trip.update"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import {
  DataTaxDetails,
  PaymentMethods,
} from "../../shared.domain/invoice/invoice.extra"
import { TripFeatures, TripState } from "../../shared.domain/trip/trip.extra"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"
import { servicePrice, taxLocal } from "../../shared/shared.consts"

class TripAppService extends ApplicationService {
  private tripManager: TripManager
  private tripUserManager: TripUserManager
  private vehicleManager: VehicleManager
  private userManager: UserManager

  constructor() {
    super()
    this.tripManager = new TripManager()
    this.tripUserManager = new TripUserManager()
    this.vehicleManager = new VehicleManager()
    this.userManager = new UserManager()
  }

  async getTrip(id: ObjectId): Promise<Response<TripDto>> {
    const response = new ResponseManager<TripDto>()

    try {
      const entity = await this.tripManager.get(id)

      const dto = mapper.map(entity, Trip, TripDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async getTripsByDriver(
    driverId: ObjectId,
    state: TripState,
  ): Promise<Response<TripDto[]>> {
    const response = new ResponseManager<TripDto[]>()

    try {
      const user = await this.userManager.get(driverId)
      if (!user.isDriver) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver),
        )
      }

      const entities = await this.tripManager.getTripsByDriver(driverId, state)

      const dto = mapper.mapArray(entities, Trip, TripDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async searchTrips(
    departure: string,
    arrival: string,
    requestedSeats: number,
  ): Promise<Response<TripsAvailablesDto[]>> {
    const response = new ResponseManager<TripsAvailablesDto[]>()

    try {
      const entities = await this.tripManager.searchTrips(
        departure,
        arrival,
        requestedSeats,
      )

      const tripsAvailables = new Array<TripsAvailablesDto>()
      for (const entity of entities) {
        const user = await this.userManager.get(entity.driverId)

        const trip = new TripsAvailablesDto()
        trip._id = entity._id
        trip.departure = entity.departure
        trip.arrival = entity.arrival.city
        trip.price = entity.finalPrice
        trip.offeredSeats = entity.offeredSeats
        trip.availableSeats = entity.availableSeats
        trip.features = entity.features
        trip.vehicleId = entity.vehicleId
        trip.driver = {
          _id: user._id,
          name: user.name,
          lastName: user.lastName,
          profilePhoto: user.profilePhoto.data.toString(
            MediaTypeNames.Text.base64,
          ),
        }

        tripsAvailables.push(trip)
      }

      return response.onSuccess(tripsAvailables)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async publishTrip(tripInsert: ITripInsert): Promise<Response<TripDto>> {
    const response = new ResponseManager<TripDto>()

    try {
      await this.vehicleManager.get(tripInsert.vehicleId)

      const user = await this.userManager.get(tripInsert.driverId)
      if (!user.isDriver) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver),
        )
      }

      const isDoorToToor = tripInsert.features.includes(
        TripFeatures.DoorToDoor,
      )
      if (isDoorToToor) {
        tripInsert.departure.latitude = undefined
        tripInsert.departure.longitude = undefined
      } else if (
        !isDoorToToor &&
        (!tripInsert.departure.latitude || !tripInsert.departure.longitude)
      ) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripErrorCodes.WithOutDepartureLocation),
        )
      }

      const entity = await this.tripManager.insert(tripInsert, servicePrice)

      const dto = mapper.map(entity, Trip, TripDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async pickUpPassengers(id: ObjectId): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()

    try {
      const entity = await this.tripManager.get(id)
      const bookedTrips = await this.tripUserManager.getTripsUserByState(
        entity._id,
        TripUserState.Booked,
      )
      if (bookedTrips.length === 0) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripErrorCodes.NoTripsBooked),
        )
      }

      await this.tripManager.pickUpPassengers(id, bookedTrips.length)
      // TODO: Se debe notificar a los usuarios que esta recogiendo a los pasajeros
      // Se debe enviar la notificacion, segun si es Door to Door o no

      return response.onSuccess(id)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async startTrip(id: ObjectId): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()
    const transaction = await this.transactionManager.beginTransaction()

    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)

      const trip = await tripManagerTransaction.get(id)
      const isDoorToToor = trip.features.includes(TripFeatures.DoorToDoor)
      if (isDoorToToor) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripErrorCodes.IsDoorToDoor),
        )
      }

      const bookedTripsUser =
        await tripUserManagerTransaction.getTripsUserByState(
          id,
          TripUserState.Booked,
        )
      for (const tripUser of bookedTripsUser) {
        await tripUserManagerTransaction.startTripDoorToDoor(tripUser._id)
      }

      await tripManagerTransaction.reduceAllPassengersToPickUp(id)
      await tripManagerTransaction.startTrip(id)
      await transaction.completeTransaction()

      return response.onSuccess(id)
    } catch (error) {
      transaction.cancellTransaction()
      return response.onError(ServiceError.getException(error))
    }
  }

  async finishTrip(id: ObjectId): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()
    const transaction = await this.transactionManager.beginTransaction()

    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)

      const entity = await tripManagerTransaction.get(id)
      const onTheWayTripsUser =
        await tripUserManagerTransaction.getTripsUserByState(
          entity._id,
          TripUserState.OnTheWay,
        )
      if (onTheWayTripsUser.length === 0) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripErrorCodes.NoTripsOnTheWay),
        )
      }

      for (const tripUser of onTheWayTripsUser) {
        await tripUserManagerTransaction.finish(tripUser._id)
        await this.insertInvoice(tripUser._id, transaction)
      }

      await tripManagerTransaction.finish(id)
      // TODO: Se debe notificar a los usuarios que se finalizo el viaje

      await transaction.completeTransaction()

      return response.onSuccess(id)
    } catch (error) {
      transaction.cancellTransaction()
      return response.onError(ServiceError.getException(error))
    }
  }

  async cancelTrip(tripCancel: ITripCancel): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()
    const transaction = await this.transactionManager.beginTransaction()

    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)

      const entity = await tripManagerTransaction.get(tripCancel.id)
      const bookedTrips = await tripUserManagerTransaction.getTripsUserByState(
        entity._id,
        TripUserState.Booked,
      )
      for (const trip of bookedTrips) {
        const tripCancel = {} as ITripUserCancel
        tripCancel.id = trip._id
        await tripUserManagerTransaction.cancel(tripCancel)
      }

      await tripManagerTransaction.cancel(tripCancel)
      // TODO: Se debe notificar a los usuarios que se cancelo el viaje

      await transaction.completeTransaction()

      return response.onSuccess(tripCancel.id)
    } catch (error) {
      transaction.cancellTransaction()
      return response.onError(ServiceError.getException(error))
    }
  }

  private async insertInvoice(
    tripUserId: ObjectId,
    transaction: TransactionSession,
  ): Promise<void> {
    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)
      const invoiceManagerTransaction = new InvoiceManager(transaction)

      const tripUser = await tripUserManagerTransaction.get(tripUserId)
      const trip = await tripManagerTransaction.get(tripUser.tripId)

      let taxes: number = 0
      const taxDetails: DataTaxDetails[] = [taxLocal]

      const invoiceInsert = {} as IInvoiceInsert
      invoiceInsert.departure = trip.departure.city
      invoiceInsert.arrival = trip.arrival.city
      invoiceInsert.paymentMethod = PaymentMethods.Cash

      invoiceInsert.numberOfSeats = tripUser.numberOfSeats
      invoiceInsert.unitPriceOfTrip = trip.tripPrice
      invoiceInsert.netPriceOfTrip = trip.tripPrice * tripUser.numberOfSeats
      invoiceInsert.unitPriceOfService = trip.servicePrice
      invoiceInsert.netPriceOfService =
        trip.servicePrice * tripUser.numberOfSeats
      invoiceInsert.netPrice = trip.finalPrice * tripUser.numberOfSeats
      invoiceInsert.discount = 0
      invoiceInsert.subtotal = invoiceInsert.netPrice - invoiceInsert.discount

      // CALCULATE TAX LOCAL
      const valueTaxLocal = parseFloat(
        (invoiceInsert.subtotal * taxLocal.tax).toFixed(2),
      )
      taxes += valueTaxLocal

      invoiceInsert.taxes = taxes
      invoiceInsert.total = invoiceInsert.subtotal + invoiceInsert.taxes

      invoiceInsert.taxDetails = taxDetails
      invoiceInsert.isPaid = true
      invoiceInsert.tripUserId = tripUserId

      await invoiceManagerTransaction.insert(invoiceInsert)
    } catch (error) {
      throw new ServiceException(
        LocalizeError.getErrorByCode(
          InvoiceErrorCodes.UnexpectedErrorWhenTryingToBill,
        ),
      )
    }
  }
}

export default TripAppService
