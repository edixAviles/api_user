import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"
import { TripUserState, PaymentMethods } from "../../shared.domain/trip/tripUser.extra"

const properties = {
    numberOfSeats: {
        type: Number,
        required: true
    },
    pickupLocation: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        dateTimeAudit: {
            type: Date
        },
    },
    tripState: [{
        state: {
            type: String,
            enum: TripUserState
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
    payment: {
        price: {
            type: Number,
            required: true
        },
        isPaid: {
            type: Boolean,
            required: true
        },
        method: {
            type: String,
            enum: PaymentMethods
        }
    },
    tripId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Trip
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.User
    }
}

const TripUserModel = mongooseModel(CollectionsName.TripUser, properties)
export default TripUserModel
