import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import { DataPickupLocation } from "../../shared/extraProperties/tripDetail.exta"

class TripDetail extends BaseBasicModel {
    @AutoMap()
    public seats: number

    @AutoMap()
    public price: number

    @AutoMap()
    public pickupLocation: DataPickupLocation

    @AutoMap()
    public tripId: ObjectId

    @AutoMap()
    public userId: ObjectId
}

export default TripDetail
