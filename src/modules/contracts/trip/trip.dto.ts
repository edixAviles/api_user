
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
    public availableSeats: number

    @AutoMap()
    public passengersToPickUp: number

    @AutoMap()
    public description: string

    @AutoMap()
    public vehicleId: ObjectId
}

export {
    TripDto
}
