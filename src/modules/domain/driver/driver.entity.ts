import { AutoMap } from "@automapper/classes"

import BaseBasicModel from "../../../core/domain/base.model"
import { DataStringVerified } from "../../shared/extraProperties/verified"
import { DataBufferApproved } from "../../shared/extraProperties/approved"

class Driver extends BaseBasicModel {
    @AutoMap()
    public identification: DataStringVerified

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
    public licencePhoto: DataBufferApproved

    @AutoMap()
    public policeRecord: DataBufferApproved
}

export default Driver
