import { ObjectId } from "mongodb"

interface ITripUserInsert {
    numberOfSeats: number
    pickupLocation?: {
        latitude: number
        longitude: number
    }
    tripId: ObjectId
    userId: ObjectId
}

export default ITripUserInsert
