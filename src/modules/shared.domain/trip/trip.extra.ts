class DataDeparture {
    departureCity: string
    departureTime: Date
}

class DataArrival {
    arrivalCity: string
    arrivalDescription: string
    latitude: number
    longitude: number
}

class DataTripStates {
    state: string
    dateTimeAudit: Date
    observation: string
    isCurrent: boolean
}

enum TripState {
    Available = "AVAILABLE",
    Full = "FULL",
    PickingUpPassengers = "PICKING_UP_PASSANGERS",
    OnTheWay = "ON_THE_WAY",
    Finished = "FINISHED",
    Cancelled = "CANCELLED"
}

enum TripFeatures {
    DoorToDoor = "DOOR_TO_DOOR",
    MaxTwoPeopleBehind = "MAX_TWO_PEOPLE_BEHIND",
    SmokingAllowed = "SMOKING_ALLOWED",
    PetsAllowed = "PETS_ALLOWED"
}

export {
    DataDeparture,
    DataArrival,
    DataTripStates,
    TripState,
    TripFeatures
}