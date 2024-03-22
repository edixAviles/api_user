import { ObjectId } from "mongodb"

interface IRatingInsert {
  rating: number
  comment: string
  userId: ObjectId
  tripId: ObjectId
}

export default IRatingInsert
