import { ObjectId } from "mongodb"

interface DriverUpdate {
    _id: ObjectId
    identification: String
    name: String
    lastName: String
    email: String
    phone: String
}

export default DriverUpdate
