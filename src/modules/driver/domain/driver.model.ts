import modelMongoose from "../../../core/domain/mongoose.model"

const properties = {
    identification: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },
}

const DriverModel = modelMongoose("Driver", properties)
export default DriverModel
