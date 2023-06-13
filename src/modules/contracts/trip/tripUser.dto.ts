import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import {
    DataPickupLocation,
    DataTripUserStates,
    DataPayment
} from "../../shared.domain/trip/tripUser.extra"

class TripUserDto {
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

class TripUserStartTrip {
    public tripUserId: ObjectId
    public tripId: ObjectId
    public isAllPassengersPickedUp: boolean
}

export {
    TripUserDto,
    TripUserStartTrip
}