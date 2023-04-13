import BaseModel from "../../../core/domain/baseModel"

class Driver extends BaseModel {
    identification: String
    name: String
    lastName: String
    email: String
    phone: String
}

/*export default object({
    identification: string().max(64).required(),
    name: string().max(128).required(),
    lastName: string().max(128).required(),
    email: string().email().required(),
    phone: string().max(64).required(),
    createdOn: date(),
    modifiedOn: date(),
})*/

export default Driver
