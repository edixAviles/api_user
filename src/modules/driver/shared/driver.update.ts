import { ObjectId } from "mongodb"

interface DriverUpdate {
    _id: ObjectId
    identification: string
    name: string
    lastName: string
    email: string
    phone: string
}

export default DriverUpdate
