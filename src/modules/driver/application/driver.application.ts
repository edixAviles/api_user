import Driver from "../domain/driver.entity"
import DriverDto from "../shared/driver.dto"
import DriverManager from "../infrastructure/driver.manager"
import DriverInput from "../shared/driver.input"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/responseManager"
import { mapper } from "../../../core/mappings/mapper"

class DriverAppService {
    private driverManager = new DriverManager()

    async registerDriver(driverInput: DriverInput): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        const entity = await this.driverManager.insert(driverInput)
        const dto = mapper.map(entity, Driver, DriverDto)
        return response.onSuccess(dto)
    }
}

export default DriverAppService
