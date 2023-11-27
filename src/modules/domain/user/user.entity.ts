import { AutoMap } from "@automapper/classes"

import BaseBasicModel from "../../../core/domain/base.model"
import { DataStringVerified, DataBufferApproved } from "../../shared.domain/user/user.extra"

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

    @AutoMap()
    public isDriver: boolean

    @AutoMap()
    public licencePhoto: DataBufferApproved

    @AutoMap()
    public policeRecord: DataBufferApproved
    
    public password: string
}

export default User
