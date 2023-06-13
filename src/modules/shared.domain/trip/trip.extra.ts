class DataDeparture {
    departureCity: string
    departureTime: Date
}

class DataArrival {
    arrivalCity: string
    arrivalTime: Date
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

export {
    DataDeparture,
    DataArrival,
    DataTripStates,
    TripState
}