import { ObjectId } from "mongodb"
import mongooseModel from "api_utility/src/domain/mongoose_model"
import { CollectionsName } from "../../shared/shared.consts"

const properties = {
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.User
    },
    tripId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Trip
    }
}

const VehicleModel = mongooseModel(CollectionsName.Rating, properties)
export default VehicleModel
