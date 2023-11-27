import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import { DataStringVerified } from "../../shared.domain/user/user.extra"
import { DataBufferApprovedDto } from "../../shared.domain/user/user.extra"

class UserDto {
    @AutoMap()
    public _id: ObjectId

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
    public profilePhoto: DataBufferApprovedDto

    @AutoMap()
    public isDriver: boolean

    @AutoMap()
    public licencePhoto: DataBufferApprovedDto

    @AutoMap()
    public policeRecord: DataBufferApprovedDto

    public password: DataBufferApprovedDto
}

export {
    UserDto
}
