import Driver from "../../domain/driver/driver.entity"
import DriverDto from "../../dto/driver/driver.dto"
import DriverManager from "../../domain/driver/driver.manager"
import DriverInput from "../../domain.shared/driver/driver.input"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/responseManager"
import { mapper } from "../../../core/mappings/mapper"

class DriverAppService {
    private driverManager = new DriverManager()

    registerDriver(driverInput: DriverInput): Response<DriverDto> {
        const response = new ResponseManager<DriverDto>()

        const entity = this.driverManager.insert(driverInput)
        const dto = mapper.map(entity, Driver, DriverDto);
        return response.onSuccess(dto)
    }
}

export default DriverAppService
