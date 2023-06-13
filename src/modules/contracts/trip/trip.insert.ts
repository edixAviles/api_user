import { ObjectId } from "mongodb"

interface ITripInsert {
    departure: {
        departureCity: string
        departureTime: Date
    }
    arrivalCity: string
    price: number
    offeredSeats: number
    description: string
    vehicleId: ObjectId
}

export default ITripInsert
