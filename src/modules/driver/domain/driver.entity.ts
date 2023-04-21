import { AutoMap } from "@automapper/classes"
import BaseModel from "../../../core/domain/base.model"

class Driver extends BaseModel {       
    @AutoMap()
    identification: String

    @AutoMap()
    name: String

    @AutoMap()
    lastName: String

    @AutoMap()
    email: String

    @AutoMap()
    phone: String
}

export default Driver
