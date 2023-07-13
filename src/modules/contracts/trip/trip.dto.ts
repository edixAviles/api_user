import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"
import {
    DataDeparture,
    DataArrival,
    DataTripStates,
} from "../../shared.domain/trip/trip.extra"

class TripDto {
    @AutoMap()
    public _id: ObjectId

    @AutoMap()
    public departure: DataDeparture

    @AutoMap()
    public arrival: DataArrival

    @AutoMap(() => [DataTripStates])
    public tripState: DataTripStates[]

    @AutoMap()
    public tripPrice: number

    @AutoMap()
    public servicePrice: number

    @AutoMap()
    public finalPrice: number

    @AutoMap()
    public offeredSeats: number

    @AutoMap()
    public availableSeats: number

    @AutoMap()
    public passengersToPickUp: number

    @AutoMap()
    public description: string

    @AutoMap(() => [String])
    public features: string[]

    @AutoMap()
    public vehicleId: ObjectId

    @AutoMap()
    public driverId: ObjectId
}

class TripDriverDataDto {
    public _id: ObjectId
    public name: string
    public lastName: string
    public profilePhoto: string
}

class TripsAvailablesDto {
    public _id: ObjectId
    public departure: DataDeparture
    public arrival: string
    public price: number
    public offeredSeats: number
    public availableSeats: number
    public features: string[]
    public vehicleId: ObjectId
    public driver: TripDriverDataDto
}

export {
    TripDto,
    TripsAvailablesDto
}
