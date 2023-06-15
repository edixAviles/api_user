
import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"
import {
    DataDeparture,
    DataArrival,
    DataTripStates
} from "../../shared.domain/trip/trip.extra"

class TripDto {
    @AutoMap()
    public departure: DataDeparture

    @AutoMap()
    public arrival: DataArrival

    @AutoMap(() => [DataTripStates])
    public tripState: DataTripStates[]

    @AutoMap()
    public price: number

    @AutoMap()
    public offeredSeats: number

    @AutoMap()
    public availableSeats: number

    @AutoMap()
    public passengersToPickUp: number

    @AutoMap()
    public description: string

    @AutoMap()
    public vehicleId: ObjectId

    @AutoMap()
    public driverId: ObjectId
}

class TripsAvailablesDto {
    public departure: DataDeparture
    public arrival: string
    public price: number
    public offeredSeats: number
    public availableSeats: number
    public description: string
    public vehicleId: ObjectId
    public driverId: ObjectId
}

export {
    TripDto,
    TripsAvailablesDto
}
