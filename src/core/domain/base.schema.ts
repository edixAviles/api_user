import mongoose from "mongoose"
import { ObjectId } from "mongodb"

const baseOptions = {
    timestamps: true
}

const baseSchema = {
    _id: {
        type: ObjectId,
        required: true,
        auto: true,
    },
    creatorId: {
        type: ObjectId,
    },
    updaterId: {
        type: ObjectId,
    },
    IsDeleted: {
        type: Boolean,
    },
    deletedAt: {
        type: Date,
    },
    deleterId: {
        type: ObjectId,
    }
}

export {
    baseOptions,
    baseSchema
}
