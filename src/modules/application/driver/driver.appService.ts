import Driver from "../../domain/driver/driver"
import DriverDto from "../../dto/driver/driver.dto"
import DriverManager from "../../domain/driver/driver.manager"
import DriverInput from "../../domain.shared/driver/driver.input"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/responseManager"

class DriverAppService {
    private driverManager: DriverManager

    registerDriver(driverInput: DriverInput): Response<DriverDto> {
        const response = new ResponseManager<DriverDto>()

        const entity = this.driverManager.insert(driverInput)
        //Mapper de DRIVER a DRIVER_DTO
        const resultDto = _objectMapper.Map<Driver, DriverDto>(entity);

        return response.onSuccess(resultDto)
    }
}

export default DriverAppService
