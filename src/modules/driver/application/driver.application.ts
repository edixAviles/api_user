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
import ApplicationService from "../../../core/infrastructure/applicationService"

class DriverAppService extends ApplicationService {

    async getDriver(id: ObjectId): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const driverManager = new DriverManager()
            const entity = await driverManager.get(id)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async insertDriver(driverInsert: IDriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const driverManager = new DriverManager()
            const entity = await driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriver(driverUpdate: IDriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        const transaction = await this.transactionManager.beginTransaction()

        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }
            
            const driverManager = new DriverManager(transaction)
            const entity = await driverManager.update(driverUpdate)
            await transaction.completeTransaction()

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            transaction.cancellTransaction()
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async updateDriverProfilePhoto(driverUpdate: IDriverUpdateProfilePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new DriverException(DriverErrorCodes.getError(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const driverManager = new DriverManager()
            const entity = await driverManager.updateProfilePhoto(driverUpdate)

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

            const driverManager = new DriverManager()
            const entity = await driverManager.updateLicencePhoto(driverUpdate)

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

            const driverManager = new DriverManager()
            const entity = await driverManager.updatePoliceRecord(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }

    async deleteDriver(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            const driverManager = new DriverManager()
            await driverManager.delete(id)

            return response.onSuccess(id)
        } catch (exception) {
            return response.onError(DriverErrorCodes.getErrorException(exception))
        }
    }
}

export default DriverAppService
