import { ObjectId } from "mongodb"
import mongooseModel from "../../../core/domain/mongoose.model"

const properties = {
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    licencePlatePhoto: {
        type: Buffer,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    },
    driverId: {
        type: ObjectId,
        ref: "Driver"
    }
}

const VehicleModel = mongooseModel("Vehicle", properties)
export default VehicleModel
