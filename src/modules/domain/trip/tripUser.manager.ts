import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"

import {
    SharedConsts
} from "../../shared/shared.consts"
import TripUser from "./tripUser.entity"
import TripUserErrorCodes from "../../shared.domain/trip/tripUser.error.codes"
import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import { DataTripUserStates, PaymentMethods, TripStateUser } from "../../shared.domain/trip/tripUser.extra"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import TripUserRepository from "./tripUser.repository"

class TripUserManager {
    private tripUserRepository: TripUserRepository

    constructor(transaction?: TransactionSession) {
        this.tripUserRepository = new TripUserRepository(transaction)
    }

    async get(id: ObjectId): Promise<TripUser> {
        const tripUser = await this.tripUserRepository.get(id)
        if (!tripUser) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripUserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return tripUser
    }

    async getTripsUserByState(tripId: ObjectId, state: string): Promise<TripUser[]> {
        const tripUser = await this.tripUserRepository.getTripsUserByState(tripId, state)
        return tripUser
    }

    async bookTrip(tripInsert: ITripUserInsert, price: number): Promise<TripUser> {
        const tripUser = new TripUser()
        tripUser.numberOfSeats = tripInsert.numberOfSeats
        tripUser.pickupLocation = {
            latitude: tripInsert.pickupLocation.latitude,
            longitude: tripInsert.pickupLocation.longitude,
            dateTimeAudit: null
        }
        tripUser.tripState = [{
            state: TripStateUser.Booked,
            dateTimeAudit: new Date(),
            observation: null,
            isCurrent: true
        }]
        tripUser.payment = {
            price: price * tripInsert.numberOfSeats,
            isPaid: false,
            method: PaymentMethods.Cash,
        }
        tripUser.tripId = tripInsert.tripId
        tripUser.userId = tripInsert.userId

        const entity = await this.tripUserRepository.insert(tripUser)
        return entity
    }

    async pickUpPassenger(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripStateUser.Booked])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripFound.tripState, TripStateUser.OnTheWayToYou)

        await this.tripUserRepository.update(tripUser)
    }

    async startTrip(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripStateUser.OnTheWayToYou])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripFound.tripState, TripStateUser.OnTheWay)

        await this.tripUserRepository.update(tripUser)
    }

    async finish(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripStateUser.OnTheWay])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripFound.tripState, TripStateUser.Finished)

        await this.tripUserRepository.update(tripUser)
    }

    async cancel(tripCancel: ITripUserCancel): Promise<void> {
        const tripFound = await this.validateTrip(tripCancel.id, [TripStateUser.Booked])

        const tripUser = new TripUser()
        tripUser._id = tripCancel.id
        tripUser.tripState = this.getNewState(tripFound.tripState, TripStateUser.Cancelled, tripCancel.observation)

        await this.tripUserRepository.update(tripUser)
        await this.tripUserRepository.delete(tripUser._id)
    }

    private validateTrip = async (id: ObjectId, states: string[]): Promise<TripUser> => {
        const tripUser = await this.tripUserRepository.get(id)
        if (!tripUser) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripUserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const available = tripUser.tripState.some(element => element.isCurrent && states.includes(element.state))
        if (!available) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripUserErrorCodes.NotAvailable, errorParams)
            throw new ServiceException(error)
        }

        return tripUser
    }

    private getNewState = (tripUserStates: DataTripUserStates[], state: string, observation?: string) => {
        const states = tripUserStates.map(element => {
            if (element.isCurrent) {
                element.isCurrent = false
            }

            return element
        })

        states.push({
            state: state,
            dateTimeAudit: new Date(),
            observation: observation,
            isCurrent: true
        })

        return states
    }
}

export default TripUserManager
