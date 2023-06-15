import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"

const properties = {
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plate: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    licencePlatePhoto: {
        type: Buffer,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.User
    }
}

const VehicleModel = mongooseModel(CollectionsName.Vehicle, properties)
export default VehicleModel
