import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseModel from "api_utility/src/domain/base_model"
import {
    DataPickupLocation,
    DataTripUserStates,
} from "../../shared.domain/trip/tripUser.extra"

class TripUser extends BaseModel {
    @AutoMap()
    public numberOfSeats: number

    @AutoMap()
    public pickupLocation?: DataPickupLocation

    @AutoMap(() => [DataTripUserStates])
    public tripState: DataTripUserStates[]

    @AutoMap()
    public tripId: ObjectId

    @AutoMap()
    public userId: ObjectId
}

export default TripUser
