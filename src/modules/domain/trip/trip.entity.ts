import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseModel from "api_utility/src/domain/base_model"
import {
  DataDeparture,
  DataArrival,
  DataTripStates,
} from "../../shared.domain/trip/trip.extra"

class Trip extends BaseModel {
  @AutoMap()
  public departure: DataDeparture

  @AutoMap()
  public arrival: DataArrival

  @AutoMap(() => [DataTripStates])
  public tripState: DataTripStates[]

  @AutoMap()
  public tripPrice: number

  @AutoMap()
  public servicePrice: number

  @AutoMap()
  public finalPrice: number

  @AutoMap()
  public offeredSeats: number

  @AutoMap()
  public availableSeats: number

  @AutoMap()
  public passengersToPickUp?: number

  @AutoMap()
  public description: string

  @AutoMap(() => [String])
  public features: string[]

  @AutoMap()
  public vehicleId: ObjectId

  @AutoMap()
  public driverId: ObjectId
}

export default Trip
