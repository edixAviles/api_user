import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"
import { TripFeatures, TripState } from "../../shared.domain/trip/trip.extra"

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
        arrivalDescription: {
            type: String,
            required: true
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    tripState: [{
        state: {
            type: String,
            enum: TripState
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
    offeredSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    passengersToPickUp: {
        type: Number
    },
    features: [{
        type: String,
        enum: TripFeatures
    }],
    description: {
        type: String
    },
    vehicleId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Vehicle
    },
    driverId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.User
    }
}

const TripModel = mongooseModel(CollectionsName.Trip, properties)
export default TripModel
