import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"
import Trip from "./trip.entity"
import ITripInsert from "../../contracts/trip/trip.insert"

import {
    SharedConsts
} from "../../shared/shared.consts"
import { TripState } from "../../shared.domain/trip/trip.extra"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"
import { ITripCancel } from "../../contracts/trip/trip.update"
import TripRepository from "./trip.repository"
import { DataTripStates } from "../../shared.domain/trip/trip.extra"

class TripManager {
    private tripRepository: TripRepository

    constructor(transaction?: TransactionSession) {
        this.tripRepository = new TripRepository(transaction)
    }

    async get(id: ObjectId): Promise<Trip> {
        const entity = await this.foundEntity(id)
        return entity
    }

    async getTripsByDriver(driverId: ObjectId, state: TripState): Promise<Trip[]> {
        const trips = await this.tripRepository.getTripsByDriver(driverId, state)
        return trips
    }

    async searchTrips(departure: string, arrival: string, requestedSeats: number): Promise<Trip[]> {
        const trips = await this.tripRepository.searchTrips(departure, arrival, requestedSeats)
        return trips
    }

    async insert(tripInsert: ITripInsert): Promise<Trip> {
        const trip = new Trip()
        trip.departure = {
            departureCity: tripInsert.departure.departureCity,
            departureTime: new Date(tripInsert.departure.departureTime)
        }
        trip.arrival = {
            arrivalCity: tripInsert.arrivalCity,
            arrivalTime: null
        }
        trip.tripState = [{
            state: TripState.Available,
            dateTimeAudit: new Date(),
            observation: null,
            isCurrent: true
        }]

        trip.price = tripInsert.price
        trip.offeredSeats = tripInsert.offeredSeats
        trip.availableSeats = tripInsert.offeredSeats
        trip.passengersToPickUp = null
        trip.description = tripInsert.description
        trip.vehicleId = tripInsert.vehicleId
        trip.driverId = tripInsert.driverId

        const entity = await this.tripRepository.insert(trip)
        return entity
    }

    async pickUpPassengers(id: ObjectId, passengersToPickUp: number): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripState.Available, TripState.Full])

        const trip = new Trip()
        trip._id = id
        trip.tripState = this.getNewState(tripFound.tripState, TripState.PickingUpPassengers)
        trip.passengersToPickUp = passengersToPickUp

        await this.tripRepository.update(trip)
    }

    async startTrip(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripState.PickingUpPassengers])

        const trip = new Trip()
        trip._id = id
        trip.tripState = this.getNewState(tripFound.tripState, TripState.OnTheWay)

        await this.tripRepository.update(trip)
    }

    async finish(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripState.OnTheWay])

        const trip = new Trip()
        trip._id = id
        trip.tripState = this.getNewState(tripFound.tripState, TripState.Finished)

        await this.tripRepository.update(trip)
    }

    async cancel(tripCancel: ITripCancel): Promise<void> {
        const tripFound = await this.validateTrip(tripCancel.id, [TripState.Available, TripState.Full])

        const trip = new Trip()
        trip._id = tripCancel.id
        trip.tripState = this.getNewState(tripFound.tripState, TripState.Cancelled, tripCancel.observation)

        await this.tripRepository.update(trip)
        await this.tripRepository.delete(trip._id)
    }

    async updateAvailableSeats(tripId: ObjectId, numberOfSeats: number): Promise<void> {
        const tripFound = await this.validateTrip(tripId, [TripState.Available])

        if (numberOfSeats == 0) {
            const errorParams = { [SharedConsts.id]: tripId }
            const error = ServiceError.getErrorByCode(TripErrorCodes.EmptySeats, errorParams)
            throw new ServiceException(error)
        }

        if (numberOfSeats > tripFound.availableSeats) {
            const errorParams = { [SharedConsts.id]: tripId }
            const error = ServiceError.getErrorByCode(TripErrorCodes.ExceededSeats, errorParams)
            throw new ServiceException(error)
        }

        const trip = new Trip()
        trip._id = tripId
        trip.availableSeats = tripFound.availableSeats - numberOfSeats

        if (trip.availableSeats == 0) {
            trip.tripState = this.getNewState(tripFound.tripState, TripState.Full)
        }

        await this.tripRepository.update(trip)
    }

    async reducePassengersToPickUp(id: ObjectId): Promise<void> {
        const tripFound = await this.validateTrip(id, [TripState.PickingUpPassengers])

        const trip = new Trip()
        trip._id = id
        trip.passengersToPickUp = tripFound.passengersToPickUp - 1

        await this.tripRepository.update(trip)
    }

    private validateTrip = async (id: ObjectId, states: string[]): Promise<Trip> => {
        const entity = await this.foundEntity(id)

        const isAvailable = entity.tripState.some(element => element.isCurrent && states.includes(element.state))
        if (!isAvailable) {
            const errorParams = { [SharedConsts.id]: id }
            const error = ServiceError.getErrorByCode(TripErrorCodes.NotAvailable, errorParams)
            throw new ServiceException(error)
        }

        return entity
    }

    private getNewState = (tripState: DataTripStates[], state: string, observation?: string) => {
        const states = tripState.map(element => {
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

    private foundEntity = async (id: ObjectId): Promise<Trip> => {
        const entity = await this.tripRepository.get(id)
        if (!entity) {
            const errorParams = { [SharedConsts.id]: id }
            const error = ServiceError.getErrorByCode(TripErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return entity
    }
}

export default TripManager
