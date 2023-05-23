import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"

const properties = {
    departure: {
        departureCity: {
            type: String,
            required: true
        },
        departureTime: {
            type: Date,
            required: true
        },
    },
    arrival: {
        arrivalCity: {
            type: String,
            required: true
        },
        latitude: {
            type: Number
        },
        length: {
            type: Number
        },
        arrivalTime: {
            type: Date
        }
    },
    price: {
        type: Number,
        required: true,
    },
    availableSeats: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    driverId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Driver
    },
    vehicleId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Vehicle
    }
}

const TripModel = mongooseModel(CollectionsName.Trip, properties)
export default TripModel
