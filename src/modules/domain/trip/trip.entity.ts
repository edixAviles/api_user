import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import { DataDeparture, DataArrival } from "../../shared.domain/trip/trip.extra"

class Trip extends BaseBasicModel {
    @AutoMap()
    public departure: DataDeparture

    @AutoMap()
    public arrival: DataArrival

    @AutoMap()
    public price: number

    @AutoMap()
    public availableSeats: number

    @AutoMap()
    public description: string

    @AutoMap()
    public driverId: ObjectId

    @AutoMap()
    public vehicleId: ObjectId
}

export default Trip
