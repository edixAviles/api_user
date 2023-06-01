
import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"
import {
    DataDeparture,
    DataArrival,
    DataTripStatus
} from "../../shared.domain/trip/trip.extra"

class TripDto {
    @AutoMap()
    public departure: DataDeparture

    @AutoMap()
    public arrival: DataArrival

    @AutoMap()
    public tripStatus: DataTripStatus

    @AutoMap()
    public price: number

    @AutoMap()
    public availableSeats: number

    @AutoMap()
    public description: string

    @AutoMap()
    public vehicleId: ObjectId
}

export {
    TripDto
}
