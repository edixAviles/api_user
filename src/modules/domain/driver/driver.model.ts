import mongooseModel from "../../../core/domain/mongoose.model"
import { CollectionsName } from "../../shared/shared.consts"

const properties = {
    identification: {
        data: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    email: {
        data: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
    },
    cellPhone: {
        data: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
    },
    profilePhoto: {
        data: {
            type: Buffer,
            required: true,
        },
        isApproved: {
            type: Boolean,
            required: true,
        },
    },
    licencePhoto: {
        data: {
            type: Buffer,
            required: true,
        },
        isApproved: {
            type: Boolean,
            required: true,
        },
    },
    policeRecord: {
        data: {
            type: Buffer,
            required: true,
        },
        isApproved: {
            type: Boolean,
            required: true,
        },
    },
    password: {
        type: String,
        required: true,
    }
}

const DriverModel = mongooseModel(CollectionsName.User, properties)
export default DriverModel
