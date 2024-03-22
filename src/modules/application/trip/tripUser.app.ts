import { ObjectId } from "mongodb"
import ApplicationService from "api_utility/src/application/application_service"
import Response from "api_utility/src/response/response"
import ResponseManager from "api_utility/src/response/response_manager"
import ServiceException from "api_utility/src/exception/service_exception"
import ServiceError from "api_utility/src/error/service_error"

import LocalizeError from "../../shared/localize_error"
import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import TripUser from "../../domain/trip/tripUser.entity"
import TripUserManager from "../../domain/trip/tripUser.manager"
import TripManager from "../../domain/trip/trip.manager"
import UserManager from "../../domain/user/user.manager"

import { mapper } from "../../../core/mappings/mapper"
import {
  TripUserDto,
  TripUserStartTrip,
} from "../../contracts/trip/tripUser.dto"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"
import { TripFeatures } from "../../shared.domain/trip/trip.extra"
import TripUserErrorCodes from "../../shared.domain/trip/tripUser.error.codes"

class TripUserAppService extends ApplicationService {
  private tripUserManager: TripUserManager
  private tripManager: TripManager
  private userManager: UserManager

  constructor() {
    super()
    this.tripUserManager = new TripUserManager()
    this.tripManager = new TripManager()
    this.userManager = new UserManager()
  }

  async getTripUser(id: ObjectId): Promise<Response<TripUserDto>> {
    const response = new ResponseManager<TripUserDto>()

    try {
      const entity = await this.tripUserManager.get(id)

      const dto = mapper.map(entity, TripUser, TripUserDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async getTripsUserByState(
    tripId: ObjectId,
    state: TripUserState,
  ): Promise<Response<TripUserDto[]>> {
    const response = new ResponseManager<TripUserDto[]>()

    try {
      const entities = await this.tripUserManager.getTripsUserByState(
        tripId,
        state,
      )

      const dto = mapper.mapArray(entities, TripUser, TripUserDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async getTripsUserByUser(
    userId: ObjectId,
    state: TripUserState,
  ): Promise<Response<TripUserDto[]>> {
    const response = new ResponseManager<TripUserDto[]>()

    try {
      const entities = await this.tripUserManager.getTripsUserByUser(
        userId,
        state,
      )

      const dto = mapper.mapArray(entities, TripUser, TripUserDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async bookTripUser(
    tripInsert: ITripUserInsert,
  ): Promise<Response<TripUserDto>> {
    const response = new ResponseManager<TripUserDto>()
    const transaction = await this.transactionManager.beginTransaction()

    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)

      await this.userManager.get(tripInsert.userId)

      const trip = await tripManagerTransaction.get(tripInsert.tripId)
      const isDoorToToor = trip.features.includes(TripFeatures.DoorToDoor)
      if (!isDoorToToor) {
        tripInsert.pickupLocation = undefined
      } else if (
        isDoorToToor &&
        (!tripInsert.pickupLocation?.latitude ||
          !tripInsert.pickupLocation?.longitude)
      ) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(
            TripUserErrorCodes.WithOutPickupLocation,
          ),
        )
      }

      await tripManagerTransaction.updateAvailableSeats(
        tripInsert.tripId,
        tripInsert.numberOfSeats,
      )
      const entity = await tripUserManagerTransaction.bookTrip(tripInsert)

      await transaction.completeTransaction()
      // TODO: Si ya se completaron las reservaciones, se debe notificar al conductor

      const dto = mapper.map(entity, TripUser, TripUserDto)
      return response.onSuccess(dto)
    } catch (error) {
      transaction.cancellTransaction()
      return response.onError(ServiceError.getException(error))
    }
  }

  async pickUpPassenger(id: ObjectId): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()

    try {
      const tripUser = await this.tripUserManager.get(id)
      const trip = await this.tripManager.get(tripUser.tripId)
      const isDoorToToor = trip.features.includes(TripFeatures.DoorToDoor)
      if (!isDoorToToor) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripUserErrorCodes.NotIsDoorToDoor),
        )
      }

      await this.tripUserManager.pickUpPassenger(id)
      // TODO: Se debe notificar al usuarios que va en camino

      return response.onSuccess(id)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async startTripUser(id: ObjectId): Promise<Response<TripUserStartTrip>> {
    const response = new ResponseManager<TripUserStartTrip>()
    const transaction = await this.transactionManager.beginTransaction()

    try {
      const tripManagerTransaction = new TripManager(transaction)
      const tripUserManagerTransaction = new TripUserManager(transaction)

      const tripUser = await tripUserManagerTransaction.get(id)
      const trip = await tripManagerTransaction.get(tripUser.tripId)
      const isDoorToToor = trip.features.includes(TripFeatures.DoorToDoor)
      if (!isDoorToToor) {
        throw new ServiceException(
          LocalizeError.getErrorByCode(TripUserErrorCodes.NotIsDoorToDoor),
        )
      }

      await tripUserManagerTransaction.startTrip(id)

      let isAllPassengersPickedUp = false
      if (trip.passengersToPickUp === 1) {
        await tripManagerTransaction.startTrip(tripUser.tripId)
        isAllPassengersPickedUp = true
      }

      await tripManagerTransaction.reducePassengersToPickUp(tripUser.tripId)
      await transaction.completeTransaction()

      const responseStartTrip = new TripUserStartTrip()
      responseStartTrip.tripUserId = id
      responseStartTrip.tripId = tripUser.tripId
      responseStartTrip.isAllPassengersPickedUp = isAllPassengersPickedUp

      return response.onSuccess(responseStartTrip)
    } catch (error) {
      transaction.cancellTransaction()
      return response.onError(ServiceError.getException(error))
    }
  }

  async cancelTripUser(
    tripCancel: ITripUserCancel,
  ): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()

    try {
      await this.tripUserManager.cancel(tripCancel)

      return response.onSuccess(tripCancel.id)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }
}

export default TripUserAppService
