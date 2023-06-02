import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"
import { StatusTripDetail, PaymentMethods } from "../../shared.domain/trip/tripDetail.exta"

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
    arrivalLocation: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        dateTimeAudit: {
            type: Date
        },
    },
    tripStatus: [{
        status: {
            type: String,
            enum: StatusTripDetail
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

const TripDetailModel = mongooseModel(CollectionsName.TripDetail, properties)
export default TripDetailModel
