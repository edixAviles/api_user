import { AutoMap } from "@automapper/classes"

class DriverDto {
    @AutoMap()
    identification: string

    @AutoMap()
    name: string

    @AutoMap()
    lastName: string

    @AutoMap()
    email: string

    @AutoMap()
    phone: string
}

export default DriverDto
