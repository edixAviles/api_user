import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"

const properties = {
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pickupLocation: {
        latitude: {
            type: Number,
            required: true
        },
        length: {
            type: Number,
            required: true
        },
        pickupTime: {
            type: Date
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