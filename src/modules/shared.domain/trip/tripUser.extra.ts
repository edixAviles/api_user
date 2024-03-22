class DataPickupLocation {
  latitude: number
  longitude: number
}

class DataTripUserStates {
  state: string
  dateTimeAudit: Date
  observation?: string
  isCurrent: boolean
}

enum TripUserState {
  Booked = "BOOKED",
  OnTheWayToYou = "ON_THE_WAY_TO_YOU",
  OnTheWay = "ON_THE_WAY",
  Finished = "FINISHED",
  Cancelled = "CANCELLED",
}

export { DataPickupLocation, DataTripUserStates, TripUserState }
