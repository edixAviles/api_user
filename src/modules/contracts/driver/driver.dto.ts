import { AutoMap } from "@automapper/classes"
import { DataStringVerified } from "../../shared.domain/driver/driver.extra"
import { DataBufferApprovedDto } from "../../shared.domain/driver/driver.extra"

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

    public password: DataBufferApprovedDto
}

export {
    DriverDto
}
