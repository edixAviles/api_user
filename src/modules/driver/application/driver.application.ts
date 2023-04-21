import Driver from "../domain/driver.entity"
import DriverDto from "../shared/driver.dto"
import DriverManager from "../infrastructure/driver.manager"
import DriverInsert from "../shared/driver.insert"
import DriverUpdate from "../shared/driver.update"

import statusCodes from "../../../core/api/statusCodes"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import { mapper } from "../../../core/mappings/mapper"
import DriverException from "../shared/driver.exception"
import { ObjectId } from "mongodb"

class DriverAppService {
    private driverManager = new DriverManager()

    async getDriver(id: ObjectId): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.get(id)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto, statusCodes.OK)
        } catch (exception) {
            return response.onError(DriverException.getErrorException(exception), statusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async insertDriver(driverInsert: DriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto, statusCodes.CREATED)
        } catch (exception) {
            return response.onError(DriverException.getErrorException(exception), statusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async updateDriver(driverUpdate: DriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate._id) {
                return response.onError(DriverException.getError(DriverException.ErrorIdNotProvided), statusCodes.FORBIDDEN)
            }

            const entity = await this.driverManager.update(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto, statusCodes.CREATED)
        } catch (exception) {
            return response.onError(DriverException.getErrorException(exception), statusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteDriver(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.driverManager.delete(id)

            return response.onSuccess(id, statusCodes.OK)
        } catch (exception) {
            return response.onError(DriverException.getErrorException(exception), statusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

export default DriverAppService
