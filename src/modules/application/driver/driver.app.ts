import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import Driver from "../../domain/driver/driver.entity"
import DriverManager from "../../domain/driver/driver.manager"
import IDriverInsert from "../../contracts/driver/driver.insert"
import DriverErrorCodes from "../../shared.domain/driver/driver.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { DriverDto } from "../../contracts/driver/driver.dto"
import {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IDriverUpdatePassword
} from "../../contracts/driver/driver.update"

class DriverAppService extends ApplicationService {
    private driverManager: DriverManager

    constructor() {
        super()
        this.driverManager = new DriverManager()
    }

    async getDriver(id: ObjectId): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.get(id)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertDriver(driverInsert: IDriverInsert): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            const entity = await this.driverManager.insert(driverInsert)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriver(driverUpdate: IDriverUpdate): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()

        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.update(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverProfilePhoto(driverUpdate: IDriverUpdateProfilePhoto): Promise<Response<DriverDto>> {
        const response = new ResponseManager<DriverDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updateProfilePhoto(driverUpdate)

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
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updateLicencePhoto(driverUpdate)

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
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updatePoliceRecord(driverUpdate)

            const dto = mapper.map(entity, Driver, DriverDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverPassword(driverUpdate: IDriverUpdatePassword): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.IdNotProvided))
            }

            await this.driverManager.updatePassword(driverUpdate)
            return response.onSuccess(driverUpdate.id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteDriver(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.driverManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default DriverAppService
