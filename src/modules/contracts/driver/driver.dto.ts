import { AutoMap } from "@automapper/classes"
import { DataStringVerified } from "../../shared/extraProperties/driver.exta"
import { DataBufferApprovedDto } from "../../shared/extraProperties/dataApproved"

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
