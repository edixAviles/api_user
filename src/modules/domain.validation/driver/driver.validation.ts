import yup = require("yup")

const driverValidationSchema = yup.object({
    identification: yup.string().max(64).required(),
    name: yup.string().max(128).required(),
    lastName: yup.string().max(128).required(),
    email: yup.string().email().required(),
    phone: yup.string().max(64).required(),
    createdOn: yup.date(),
    modifiedOn: yup.date(),
})

export default driverValidationSchema
