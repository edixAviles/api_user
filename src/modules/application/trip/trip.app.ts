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

import { mapper } from "../../../core/mappings/mapper"
import { TripDto } from "../../contracts/trip/trip.dto"
import { ITripCancel } from "../../contracts/trip/trip.update"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"
import { TripStateUser } from "../../shared.domain/trip/tripUser.extra"

class TripAppService extends ApplicationService {
    private tripManager: TripManager
    private tripUserManager: TripUserManager
    private vehicleManager: VehicleManager

    constructor() {
        super()
        this.tripManager = new TripManager()
        this.tripUserManager = new TripUserManager()
        this.vehicleManager = new VehicleManager()
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

    async publishTrip(tripInsert: ITripInsert): Promise<Response<TripDto>> {
        const response = new ResponseManager<TripDto>()

        try {
            const vehicle = await this.vehicleManager.get(tripInsert.vehicleId)
            if (!vehicle) {
                throw new ServiceException(ServiceError.getErrorByCode(VehicleErrorCodes.EntityNotFound))
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
            const bookedTrips = await this.tripUserManager.getTripsUserByState(entity._id, TripStateUser.Booked)
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
            const onTheWayTrips = await tripUserManagerTransaction.getTripsUserByState(entity._id, TripStateUser.OnTheWay)
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

        try {
            await this.tripManager.cancel(tripCancel)

            return response.onSuccess(tripCancel.id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default TripAppService
