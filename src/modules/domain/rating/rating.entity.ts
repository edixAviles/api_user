import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseModel from "api_utility/src/domain/base_model"

class Rating extends BaseModel {
    @AutoMap()
    public rating: number

    @AutoMap()
    public comment: string

    @AutoMap()
    public userId: ObjectId

    @AutoMap()
    public tripId: ObjectId
}

export default Rating
