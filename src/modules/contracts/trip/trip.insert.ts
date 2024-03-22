import { ObjectId } from "mongodb"

interface ITripInsert {
    departure: {
        city: string
        dateAndTime: Date
        description: string
        latitude?: number
        longitude?: number
    }
    arrival: {
        city: string
        description: string
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
