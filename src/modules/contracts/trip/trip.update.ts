import { ObjectId } from "mongodb"

interface ITripCancel {
    id: ObjectId
    observation: string
}

export {
    ITripCancel
}
