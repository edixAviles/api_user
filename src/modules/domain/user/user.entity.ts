import { AutoMap } from "@automapper/classes"

import BaseBasicModel from "../../../core/domain/base.model"
import { DataStringVerified, DataBufferApproved } from "../../shared.domain/driver/driver.extra"

class User extends BaseBasicModel {
    @AutoMap()
    public name: string

    @AutoMap()
    public lastName: string

    @AutoMap()
    public birthdate: Date

    @AutoMap()
    public email: DataStringVerified

    @AutoMap()
    public cellPhone: DataStringVerified

    @AutoMap()
    public profilePhoto: DataBufferApproved
    
    public password: string
}

export default User
