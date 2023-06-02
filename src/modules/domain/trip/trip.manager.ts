import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"
import Trip from "./trip.entity"
import ITripInsert from "../../contracts/trip/trip.insert"

import {
    SharedConsts
} from "../../shared/shared.consts"
import { StatusTrip } from "../../shared.domain/trip/trip.extra"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"
import { ITripCancel } from "../../contracts/trip/trip.update"
import TripRepository from "./trip.repository"
import { DataTripStatus } from "../../shared.domain/trip/tripDetail.exta"

class TripManager {
    private tripRepository: TripRepository

    constructor(transaction?: TransactionSession) {
        this.tripRepository = new TripRepository(transaction)
    }

    async get(id: ObjectId): Promise<Trip> {
        const trip = await this.tripRepository.get(id)
        if (!trip) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return trip
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
        trip.tripStatus = [{
            status: StatusTrip.Available,
            dateTimeAudit: new Date(),
            observation: null,
            isCurrent: true
        }]

        trip.price = tripInsert.price
        trip.availableSeats = tripInsert.availableSeats
        trip.description = tripInsert.description
        trip.vehicleId = tripInsert.vehicleId

        const entity = await this.tripRepository.insert(trip)
        return entity
    }

    async finish(id: ObjectId): Promise<void> {
        const tripFound = await this.tripRepository.get(id)
        if (!tripFound) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const available = tripFound.tripStatus.some(element => element.isCurrent && (element.status === StatusTrip.Available || element.status === StatusTrip.Full))
        if (!available) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(TripErrorCodes.TripNotAvailable, errorParams)
            throw new ServiceException(error)
        }

        const trip = new Trip()
        trip._id = id
        trip.tripStatus = this.getNewState(tripFound.tripStatus, StatusTrip.Finished)

        await this.tripRepository.update(trip)
    }

    async cancel(tripCancel: ITripCancel): Promise<void> {
        const tripFound = await this.tripRepository.get(tripCancel.id)
        if (!tripFound) {
            const errorParams = {
                [SharedConsts.id]: tripCancel.id
            }
            const error = ServiceError.getErrorByCode(TripErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const available = tripFound.tripStatus.some(element => element.isCurrent && (element.status === StatusTrip.Available || element.status === StatusTrip.Full))
        if (!available) {
            const errorParams = {
                [SharedConsts.id]: tripCancel.id
            }
            const error = ServiceError.getErrorByCode(TripErrorCodes.TripNotAvailable, errorParams)
            throw new ServiceException(error)
        }

        const trip = new Trip()
        trip._id = tripCancel.id
        trip.tripStatus = this.getNewState(tripFound.tripStatus, StatusTrip.Cancelled, tripCancel.observation)

        await this.tripRepository.update(trip)
    }

    private getNewState = (tripStatus: DataTripStatus[], state: string, observation?: string) => {
        const status = tripStatus.map(element => {
            if (element.isCurrent) {
                element.isCurrent = false
            }

            return element
        })

        status.push({
            status: state,
            dateTimeAudit: new Date(),
            observation: observation,
            isCurrent: true
        })

        return status
    }
}

export default TripManager
