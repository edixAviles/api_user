import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"
import {
    DataPickupLocation,
    DataTripUserStates,
    DataPayment
} from "../../shared.domain/trip/tripUser.extra"

class TripUser extends BaseBasicModel {
    @AutoMap()
    public numberOfSeats: number

    @AutoMap()
    public pickupLocation: DataPickupLocation

    @AutoMap(() => [DataTripUserStates])
    public tripState: DataTripUserStates[]

    @AutoMap()
    public payment: DataPayment

    @AutoMap()
    public tripId: ObjectId

    @AutoMap()
    public userId: ObjectId
}

export default TripUser
