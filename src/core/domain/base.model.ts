import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

abstract class BaseModel {
    @AutoMap()
    _id?: ObjectId
    
    createdAt: Date
    creatorUser?: string
    updatedAt: Date
    updaterUser?: string
    isDeleted: boolean
    deletedAt?: Date
    deleterUser?: string

    constructor(document?: any) {
        Object.assign(this, document?._doc || document)
    }
}

export default BaseModel
