import { createMap } from "@automapper/core"
import { mapper } from "./mapper"
import Driver from "../../modules/domain/driver/driver.entity"
import DriverDto from "../../modules/dto/driver/driver.dto"

createMap(mapper, Driver, DriverDto)
