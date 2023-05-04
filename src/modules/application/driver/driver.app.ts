import { ObjectId } from "mongodb"

import Driver from "../../domain/driver/driver.entity"
import DriverDto from "../../contracts/driver/driver.dto"
import DriverManager from "../../domain/driver/driver.manager"
import IDriverInsert from "../../contracts/driver/driver.insert"
import DriverErrorCodes from "../../shared.domain/driver/driver.error.codes"
import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"

import {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord
} from "../../contracts/driver/driver.update"
import { mapper } from "../../../core/mappings/mapper"

class DriverAppService extends ApplicationService {

    async getDriver(id: ObjectId): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const driverManager = new DriverManager()
            const entity = await driverManager.get(id)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertDriver(driverInsert: IDriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const driverManager = new DriverManager()
            const entity = await driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriver(driverUpdate: IDriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        const transaction = await this.transactionManager.beginTransaction()

        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorIdNotProvided))
            }
            
            const driverManager = new DriverManager(transaction)
            const entity = await driverManager.update(driverUpdate)
            await transaction.completeTransaction()

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            transaction.cancellTransaction()
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverProfilePhoto(driverUpdate: IDriverUpdateProfilePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const driverManager = new DriverManager()
            const entity = await driverManager.updateProfilePhoto(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverLicencePhoto(driverUpdate: IDriverUpdateLicencePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const driverManager = new DriverManager()
            const entity = await driverManager.updateLicencePhoto(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverPoliceRecord(driverUpdate: IDriverUpdatePoliceRecord): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorIdNotProvided))
            }

            const driverManager = new DriverManager()
            const entity = await driverManager.updatePoliceRecord(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteDriver(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            const driverManager = new DriverManager()
            await driverManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default DriverAppService
