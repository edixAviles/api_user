import { ObjectId } from "mongodb"

abstract class BaseModel {
    _id?: ObjectId
    createdAt: Date
    creatorUser?: String
    updatedAt: Date
    updaterUser?: String
    isDeleted: boolean
    deletedAt?: Date
    deleterUser?: String

    constructor(document?: any) {
        if (document) {
            this._id = document.id
            this.createdAt = document.createdAt
            this.creatorUser = document.creatorUser
            this.updatedAt = document.updatedAt
            this.updaterUser = document.updaterUser
            this.isDeleted = document.isDeleted
            this.deletedAt = document.deletedAt
            this.deleterUser = document.deleterUser
        }
    }
}

export default BaseModel
