import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"

class Rating extends BaseBasicModel {
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
