import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import {
  DataPickupLocation,
  DataTripUserStates,
} from "../../shared.domain/trip/tripUser.extra"

class TripUserDto {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public numberOfSeats: number

  @AutoMap()
  public pickupLocation: DataPickupLocation

  @AutoMap(() => [DataTripUserStates])
  public tripState: DataTripUserStates[]

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

export { TripUserDto, TripUserStartTrip }
