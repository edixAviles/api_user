import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"

import ITripInsert from "../../contracts/trip/trip.insert"
import Trip from "../../domain/trip/trip.entity"
import TripManager from "../../domain/trip/trip.manager"
import VehicleErrorCodes from "../../shared.domain/vehicle/vehicle.error.codes"
import VehicleManager from "../../domain/vehicle/vehicle.manager"
import TripUserManager from "../../domain/trip/tripUser.manager"
import UserManager from "../../domain/user/user.manager"

import { mapper } from "../../../core/mappings/mapper"
import { TripDto, TripsAvailablesDto } from "../../contracts/trip/trip.dto"
import { ITripCancel } from "../../contracts/trip/trip.update"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import { TripState } from "../../shared.domain/trip/trip.extra"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"
import { SharedConsts } from "../../shared/shared.consts"

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

    async getTripsByDriver(driverId: ObjectId, state: TripState): Promise<Response<TripDto[]>> {
        const response = new ResponseManager<TripDto[]>()

        try {
            const user = await this.userManager.get(driverId)
            if (!user.isDriver) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IsNotDriver))
            }

            const entities = await this.tripManager.getTripsByDriver(driverId, state)

            const dto = mapper.mapArray(entities, Trip, TripDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async searchTrips(departure: string, arrival: string, requestedSeats: number): Promise<Response<TripsAvailablesDto[]>> {
        const response = new ResponseManager<TripsAvailablesDto[]>()

        try {
            const entities = await this.tripManager.searchTrips(departure, arrival, requestedSeats)
            
            const tripsAvailables = new Array<TripsAvailablesDto>()
            entities.forEach(entity => {
                const trip = new TripsAvailablesDto()
                trip.departure = entity.departure
                trip.arrival = entity.arrival.arrivalCity
                trip.price = entity.price
                trip.offeredSeats = entity.offeredSeats
                trip.availableSeats = entity.availableSeats
                trip.description = entity.description
                trip.vehicleId = entity.vehicleId
                trip.driverId = entity.driverId

                tripsAvailables.push(trip)
            })

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
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IsNotDriver))
            }

            const entity = await this.tripManager.insert(tripInsert)

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
            const bookedTrips = await this.tripUserManager.getTripsUserByState(entity._id, TripUserState.Booked)
            if (bookedTrips.length === 0) {
                throw new ServiceException(ServiceError.getErrorByCode(TripErrorCodes.NoTripsBooked))
            }

            await this.tripManager.pickUpPassengers(id, bookedTrips.length)
            // TODO: Se debe notificar a los usuarios que esta recogiendo a los pasajeros

            return response.onSuccess(id)
        } catch (error) {
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
            const onTheWayTrips = await tripUserManagerTransaction.getTripsUserByState(entity._id, TripUserState.OnTheWay)
            if (onTheWayTrips.length === 0) {
                throw new ServiceException(ServiceError.getErrorByCode(TripErrorCodes.NoTripsOnTheWay))
            }

            for (const trip of onTheWayTrips) {
                await tripUserManagerTransaction.finish(trip._id)
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
            const bookedTrips = await tripUserManagerTransaction.getTripsUserByState(entity._id, TripUserState.Booked)
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
}

export default TripAppService
