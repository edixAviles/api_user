import { ObjectId } from "mongodb"

abstract class BaseModel {
    _id?: ObjectId
    createdAt: Date
    creatorId?: ObjectId
    updatedAt: Date
    updaterId?: ObjectId
    IsDeleted: Boolean
    deletedAt?: Date
    deleterId?: ObjectId
}

export default BaseModel
