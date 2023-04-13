import Driver from "../../domain/driver/driver.entity"
import DriverDto from "../../dto/driver/driver.dto"
import DriverManager from "../../domain/driver/driver.manager"
import DriverInput from "../../domain.shared/driver/driver.input"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/responseManager"
import { mapper } from "../../../core/mappings/mapper"

class DriverAppService {
    private driverManager: DriverManager

    registerDriver(driverInput: DriverInput): Response<DriverDto> {
        const response = new ResponseManager<DriverDto>()

        const driver = this.driverManager.insert(driverInput)
        const driverDto = mapper.map(driver, Driver, DriverDto);
        return response.onSuccess(driverDto)
    }
}

export default DriverAppService
