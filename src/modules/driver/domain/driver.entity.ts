import { AutoMap } from "@automapper/classes"
import BaseModel from "../../../core/domain/base.model"
import DriverInput from "../shared/driver.input"

class Driver extends BaseModel {
    constructor(driverInput?: DriverInput) {
        super()

        if (driverInput) {
            this.identification = driverInput.identification
            this.name = driverInput.name
            this.lastName = driverInput.lastName
            this.email = driverInput.email
            this.phone = driverInput.phone
        }
    }

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

export default Driver
