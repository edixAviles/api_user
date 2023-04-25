import { createMap } from "@automapper/core"
import { mapper } from "./mapper"
import Driver from "../../modules/driver/domain/driver.entity"
import DriverDto from "../../modules/driver/shared/domain/driver.dto"

const runMappers = () => {
    createMap(mapper, Driver, DriverDto)
}

export default runMappers
