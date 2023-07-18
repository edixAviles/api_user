enum TripErrorCodes {
    EntityNotFound = "TRIP_ERROR_ENTITY_NOT_FOUND",
    NotAvailable = "TRIP_ERROR_TRIP_NOT_AVAILABLE",
    EmptySeats = "TRIP_ERROR_EMPTY_SEATS",
    ExceededSeats = "TRIP_ERROR_EXCEEDED_SEATS",
    NoTripsBooked = "TRIP_ERROR_NO_TRIPS_BOOKED",
    NoTripsOnTheWay = "TRIP_ERROR_NO_TRIPS_ON_THE_WAY",
    TripNotFinished = "TRIP_NOT_FINISHED",
    WithOutDepartureLocation = "WITH_OUT_DEPARTURE_LOCATION",
    IsDoorToDoor = "IS_DOOR_TO_DOOR"
}

export default TripErrorCodes
