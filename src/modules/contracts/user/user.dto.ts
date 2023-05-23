import { AutoMap } from "@automapper/classes"
import { DataStringVerified } from "../../shared.domain/driver/driver.exta"
import { DataBufferApprovedDto } from "../../shared.domain/driver/driver.exta"

class UserDto {
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
}

export {
    UserDto
}
