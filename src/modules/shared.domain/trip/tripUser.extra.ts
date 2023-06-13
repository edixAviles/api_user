class DataPickupLocation {
    latitude: number
    longitude: number
    dateTimeAudit: Date
}

class DataTripUserStates {
    state: string
    dateTimeAudit: Date
    observation: string
    isCurrent: boolean
}

class DataPayment {
    price: number
    isPaid: boolean
    method: string
}

enum TripStateUser {
    Booked = "BOOKED",
    OnTheWayToYou = "ON_THE_WAY_TO_YOU",
    OnTheWay = "ON_THE_WAY",
    Finished = "FINISHED",
    Cancelled = "CANCELLED"
}

enum PaymentMethods {
    Cash = "CASH",
    CreditCard = "CREDIT_CARD",
    BankTransfer = "BANK_TRANSFER"
}

export {
    DataPickupLocation,
    DataTripUserStates,
    DataPayment,
    TripStateUser,
    PaymentMethods
}