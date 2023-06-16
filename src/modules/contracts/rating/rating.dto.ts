import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

class RatingDto {
    @AutoMap()
    public _id: ObjectId

    @AutoMap()
    public rating: number

    @AutoMap()
    public comment: string

    @AutoMap()
    public userId: ObjectId

    @AutoMap()
    public tripId: ObjectId
}

export {
    RatingDto
}
