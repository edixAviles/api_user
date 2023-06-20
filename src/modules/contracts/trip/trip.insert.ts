import { ObjectId } from "mongodb"

interface ITripInsert {
    departure: {
        departureCity: string
        departureTime: Date
    }
    arrival: {
        arrivalCity: string
        arrivalDescription: string
        latitude: number
        longitude: number
    }
    price: number
    offeredSeats: number
    features: string[]
    description: string
    vehicleId: ObjectId
    driverId: ObjectId
}

export default ITripInsert
