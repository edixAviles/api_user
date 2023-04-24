import Driver from "../domain/driver.entity"
import DriverDto from "../shared/driver.dto"
import DriverManager from "../infrastructure/driver.manager"
import DriverInsert from "../shared/driver.insert"
import DriverUpdate from "../shared/driver.update"

import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import { mapper } from "../../../core/mappings/mapper"
import DriverErrorCodes from "../shared/exception/driver.error.codes"
import { ObjectId } from "mongodb"
import DriverException from "../shared/exception/driver.exception"

class DriverAppService {
    private driverManager = new DriverManager()

    async getDriver(id: ObjectId): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.get(id)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async insertDriver(driverInsert: DriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriver(driverUpdate: DriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate._id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const entity = await this.driverManager.update(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async deleteDriver(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.driverManager.delete(id)

            return response.onSuccess(id)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }
}

export default DriverAppService
