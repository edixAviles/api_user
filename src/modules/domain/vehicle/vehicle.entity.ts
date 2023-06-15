import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseBasicModel from "../../../core/domain/base.model"

class Vehicle extends BaseBasicModel {
    @AutoMap()
    public brand: string

    @AutoMap()
    public model: string

    @AutoMap()
    public plate: string

    @AutoMap()
    public color: string

    @AutoMap()
    public year: number

    @AutoMap()
    public licencePlatePhoto: Buffer

    @AutoMap()
    public isVerified: boolean

    @AutoMap()
    public userId: ObjectId
}

export default Vehicle
