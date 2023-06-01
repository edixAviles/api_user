import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import {
    DataPickupLocation,
    DataArrivalLocation,
    DataTripStatus,
    DataPayment
} from "../../shared.domain/trip/tripDetail.exta"

class TripDetail extends BaseBasicModel {
    @AutoMap()
    public numberOfSeats: number

    @AutoMap()
    public pickupLocation: DataPickupLocation

    @AutoMap()
    public arrivalLocation: DataArrivalLocation

    @AutoMap()
    public tripStatus: DataTripStatus[]

    @AutoMap()
    public payment: DataPayment

    @AutoMap()
    public tripId: ObjectId

    @AutoMap()
    public userId: ObjectId
}

export default TripDetail
