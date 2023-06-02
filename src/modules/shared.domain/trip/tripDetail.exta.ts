class DataPickupLocation {
    latitude: number
    longitude: number
    dateTimeAudit: Date
}

class DataArrivalLocation {
    latitude: number
    longitude: number
    dateTimeAudit: Date
}

class DataTripStatus {
    status: string
    dateTimeAudit: Date
    observation: string
    isCurrent: boolean
}

class DataPayment {
    price: number
    isPaid: boolean
    method: string
}

enum StatusTripDetail {
    Reserved = "RESERVED",
    OnTheWay = "ON_THE_WAY",
    Finished = "FINISHED",
    Cancelled = "CANCELLED"
}

enum PaymentMethods {
    Cash = "CASH",
    CreditCard = "CREDIT_cARD",
    BankTransfer = "BANK_TRANSFER"
}

export {
    DataPickupLocation,
    DataArrivalLocation,
    DataTripStatus,
    DataPayment,
    StatusTripDetail,
    PaymentMethods
}