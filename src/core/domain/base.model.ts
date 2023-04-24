import { ObjectId } from "mongodb"

abstract class BaseModel {
    _id?: ObjectId
    createdAt: Date
    creatorId?: ObjectId
    updatedAt: Date
    updaterId?: ObjectId
    IsDeleted: boolean
    deletedAt?: Date
    deleterId?: ObjectId

    constructor(document?: any) {
        if (document) {
            this._id = document.id
            this.createdAt = document.createdAt
            this.creatorId = document.creatorId
            this.updatedAt = document.updatedAt
            this.updaterId = document.updaterId
            this.IsDeleted = document.IsDeleted
            this.deletedAt = document.deletedAt
            this.deleterId = document.deleterId
        }
    }
}

export default BaseModel
