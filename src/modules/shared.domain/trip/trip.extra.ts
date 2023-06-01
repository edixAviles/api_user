class DataDeparture {
    departureCity: string
    departureTime: Date
}

class DataArrival {
    arrivalCity: string
    arrivalTime: Date
}

class DataTripStatus {
    status: string
    dateTimeAudit: Date
    observation: string
    isCurrent: boolean
}

enum StatusTrip {
    Available = "AVAILABLE",
    Full = "FULL",
    OnTheWay = "ON_THE_WAY",
    Finished = "FINISHED",
    Cancelled = "CANCELLED"
}

export {
    DataDeparture,
    DataArrival,
    DataTripStatus,
    StatusTrip
}