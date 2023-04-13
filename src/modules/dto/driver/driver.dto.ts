import { AutoMap } from "@automapper/classes"

class DriverDto {
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

export default DriverDto
