import { AutoMap } from "@automapper/classes"
import { DataStringVerified } from "../../shared/extraProperties/verified"
import { DataBufferApprovedDto } from "../../shared/extraProperties/approved"

class DriverDto {
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
    public profilePhoto: DataBufferApprovedDto

    @AutoMap()
    public licencePhoto: DataBufferApprovedDto

    @AutoMap()
    public policeRecord: DataBufferApprovedDto
}

export {
    DriverDto
}
