import { ObjectId } from "mongodb"
import ServiceException from "api_utility/src/exception/service_exception"
import TransactionSession from "api_utility/src/database/transaction_session"
import EntityFields from "api_utility/src/domain/entity_fields"

import LocalizeError from "../../shared/localize_error"
import TripUser from "./tripUser.entity"
import TripUserErrorCodes from "../../shared.domain/trip/tripUser.error.codes"
import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import { DataTripUserStates, TripUserState } from "../../shared.domain/trip/tripUser.extra"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import TripUserRepository from "./tripUser.repository"

class TripUserManager {
    private tripUserRepository: TripUserRepository

    constructor(transaction?: TransactionSession) {
        this.tripUserRepository = new TripUserRepository(transaction)
    }

    async get(id: ObjectId): Promise<TripUser> {
        const entity = await this.foundEntity(id)
        return entity
    }

    async getTripsUserByState(tripId: ObjectId, state: TripUserState): Promise<TripUser[]> {
        const tripsUser = await this.tripUserRepository.getTripsUserByState(tripId, state)
        return tripsUser
    }

    async getTripsUserByUser(userId: ObjectId, state: TripUserState): Promise<TripUser[]> {
        const tripsUser = await this.tripUserRepository.getTripsUserByUser(userId, state)
        return tripsUser
    }

    async bookTrip(tripInsert: ITripUserInsert): Promise<TripUser> {
        const tripUser = new TripUser()
        tripUser.numberOfSeats = tripInsert.numberOfSeats
        tripUser.pickupLocation = tripInsert.pickupLocation
        tripUser.tripState = this.getNewState([], TripUserState.Booked)
        tripUser.tripId = tripInsert.tripId
        tripUser.userId = tripInsert.userId

        const entity = await this.tripUserRepository.insert(tripUser)
        return entity
    }

    async pickUpPassenger(id: ObjectId): Promise<void> {
        const tripUserFound = await this.validateTrip(id, [TripUserState.Booked])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripUserFound.tripState, TripUserState.OnTheWayToYou)

        await this.tripUserRepository.update(tripUser)
    }

    async startTripDoorToDoor(id: ObjectId): Promise<void> {
        const tripUserFound = await this.validateTrip(id, [TripUserState.Booked])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripUserFound.tripState, TripUserState.OnTheWay)

        await this.tripUserRepository.update(tripUser)
    }

    async startTrip(id: ObjectId): Promise<void> {
        const tripUserFound = await this.validateTrip(id, [TripUserState.OnTheWayToYou])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripUserFound.tripState, TripUserState.OnTheWay)

        await this.tripUserRepository.update(tripUser)
    }

    async finish(id: ObjectId): Promise<void> {
        const tripUserFound = await this.validateTrip(id, [TripUserState.OnTheWay])

        const tripUser = new TripUser()
        tripUser._id = id
        tripUser.tripState = this.getNewState(tripUserFound.tripState, TripUserState.Finished)

        await this.tripUserRepository.update(tripUser)
    }

    async cancel(tripCancel: ITripUserCancel): Promise<void> {
        const tripUserFound = await this.validateTrip(tripCancel.id, [TripUserState.Booked])

        const tripUser = new TripUser()
        tripUser._id = tripCancel.id
        tripUser.tripState = this.getNewState(tripUserFound.tripState, TripUserState.Cancelled, tripCancel.observation)

        await this.tripUserRepository.update(tripUser)
        await this.tripUserRepository.delete(tripUser._id)
    }

    private validateTrip = async (id: ObjectId, states: string[]): Promise<TripUser> => {
        const entity = await this.foundEntity(id)

        const isAvailable = entity.tripState.some(element => element.isCurrent && states.includes(element.state))
        if (!isAvailable) {
            const errorParams = new Map<string, string>([[EntityFields.id, id.toString()]])
            const error = LocalizeError.getErrorByCode(TripUserErrorCodes.NotAvailable, errorParams)
            throw new ServiceException(error)
        }

        return entity
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

    private foundEntity = async (id: ObjectId): Promise<TripUser> => {
        const entity = await this.tripUserRepository.get(id)
        if (!entity) {
            const errorParams = new Map<string, string>([[EntityFields.id, id.toString()]])
            const error = LocalizeError.getErrorByCode(TripUserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return entity
    }
}

export default TripUserManager
