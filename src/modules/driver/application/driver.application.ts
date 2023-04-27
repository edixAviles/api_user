import { ObjectId } from "mongodb"

import Driver from "../domain/driver.entity"
import DriverDto from "../shared/domain/driver.dto"
import DriverManager from "../infrastructure/driver.manager"
import IDriverInsert from "../shared/domain/driver.insert"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import DriverErrorCodes from "../shared/exception/driver.error.codes"
import DriverException from "../shared/exception/driver.exception"

import { mapper } from "../../../core/mappings/mapper"
import {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord
} from "../shared/domain/driver.update"

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

    async insertDriver(driverInsert: IDriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriver(driverUpdate: IDriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const entity = await this.driverManager.update(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriverProfilePhoto(driverUpdate: IDriverUpdateProfilePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const entity = await this.driverManager.updateProfilePhoto(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriverLicencePhoto(driverUpdate: IDriverUpdateLicencePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const entity = await this.driverManager.updateLicencePhoto(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriverPoliceRecord(driverUpdate: IDriverUpdatePoliceRecord): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const entity = await this.driverManager.updatePoliceRecord(driverUpdate)

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
