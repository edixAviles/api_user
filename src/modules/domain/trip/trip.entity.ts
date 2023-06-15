import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import {
    DataDeparture,
    DataArrival,
    DataTripStates
} from "../../shared.domain/trip/trip.extra"

class Trip extends BaseBasicModel {
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

export default Trip
