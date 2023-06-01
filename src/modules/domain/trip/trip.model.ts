import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"
import { StatusTrip } from "../../shared.domain/trip/trip.extra"

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
        arrivalTime: {
            type: Date
        }
    },
    tripStatus: [{
        status: {
            type: String,
            enum: StatusTrip
        },
        dateTimeAudit: {
            type: Date,
            required: true
        },
        observation: {
            type: String
        },
        isCurrent: {
            type: Boolean,
            required: true
        },
    }],
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
    vehicleId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Vehicle
    }
}

const TripModel = mongooseModel(CollectionsName.Trip, properties)
export default TripModel
