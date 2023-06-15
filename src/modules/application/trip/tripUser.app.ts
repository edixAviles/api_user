import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import TripUser from "../../domain/trip/tripUser.entity"
import TripUserManager from "../../domain/trip/tripUser.manager"
import TripManager from "../../domain/trip/trip.manager"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { TripUserDto, TripUserStartTrip } from "../../contracts/trip/tripUser.dto"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

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

    async getTripsUserByState(tripId: ObjectId, state: TripUserState): Promise<Response<TripUserDto[]>> {
        const response = new ResponseManager<TripUserDto[]>()

        try {
            const entities = await this.tripUserManager.getTripsUserByState(tripId, state)

            const dto = mapper.mapArray(entities, TripUser, TripUserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async getTripsUserByUser(userId: ObjectId, state: TripUserState): Promise<Response<TripUserDto[]>> {
        const response = new ResponseManager<TripUserDto[]>()

        try {
            const entities = await this.tripUserManager.getTripsUserByUser(userId, state)

            const dto = mapper.mapArray(entities, TripUser, TripUserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async bookTripUser(tripInsert: ITripUserInsert): Promise<Response<TripUserDto>> {
        const response = new ResponseManager<TripUserDto>()
        const transaction = await this.transactionManager.beginTransaction()

        try {
            const tripManagerTransaction = new TripManager(transaction)
            const tripUserManagerTransaction = new TripUserManager(transaction)

            const trip = await tripManagerTransaction.get(tripInsert.tripId)
            if (!trip) {
                throw new ServiceException(ServiceError.getErrorByCode(TripErrorCodes.EntityNotFound))
            }

            const user = await this.userManager.get(tripInsert.userId)
            if (!user) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound))
            }

            await tripManagerTransaction.updateAvailableSeats(tripInsert.tripId, tripInsert.numberOfSeats)
            const entity = await tripUserManagerTransaction.bookTrip(tripInsert, trip.price)

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
            await tripUserManagerTransaction.startTrip(id)
            
            let isAllPassengersPickedUp = false
            const trip = await tripManagerTransaction.get(tripUser.tripId)
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

    async cancelTripUser(tripCancel: ITripUserCancel): Promise<Response<ObjectId>> {
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
