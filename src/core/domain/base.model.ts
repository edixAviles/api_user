import { ObjectId } from "mongodb"

abstract class BaseModel {
    _id?: ObjectId
    createdAt: Date
    creatorUser?: string
    updatedAt: Date
    updaterUser?: string
    isDeleted: boolean
    deletedAt?: Date
    deleterUser?: string

    constructor(document?: any) {
        if (document?._doc) {
            Object.assign(this, document?._doc)
        }
    }
}

export default BaseModel
