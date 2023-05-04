import mongooseModel from "../../../core/domain/mongoose.model"

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
}

const DriverModel = mongooseModel("Driver", properties)
export default DriverModel
