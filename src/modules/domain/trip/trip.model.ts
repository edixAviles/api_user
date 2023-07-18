import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"
import { TripFeatures, TripState } from "../../shared.domain/trip/trip.extra"

const properties = {
    departure: {
        city: {
            type: String,
            required: true
        },
        dateAndTime: {
            type: Date,
            required: true
        },
        description: {
            type: String
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    arrival: {
        city: {
            type: String,
            required: true
        },
        description: {
            type: String
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
    tripPrice: {
        type: Number,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
    finalPrice: {
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
    description: {
        type: String
    },
    features: [{
        type: String,
        enum: TripFeatures
    }],
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
