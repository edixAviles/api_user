import DriverDto from "../dto/driver.dto"
import DriverManager from "../domain/driver.manager"
import DriverInput from "../domain/driver.input"
import Response from "../middleware/response/response"
import ResponseManager from "../middleware/response/responseManager"

class DriverAppService {
    private driverManager: DriverManager

    createDriver(driverInput: DriverInput): Response<DriverDto> {
        const response = new ResponseManager<DriverDto>()

        const driver = this.driverManager.insert(driverInput)
        //Mapper de DRIVER a DRIVER_DTO
        const driverDto = new DriverDto()

        return response.onSuccess(driverDto)
    }
}

export default DriverAppService
