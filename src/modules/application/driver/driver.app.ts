import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import User from "../../domain/user/user.entity"
import DriverManager from "../../domain/user/user.manager"
import IUserInsert from "../../contracts/user/user.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { UserDto } from "../../contracts/user/user.dto"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdateLicencePhoto,
    IUserUpdatePoliceRecord,
    IUserUpdatePassword
} from "../../contracts/user/user.update"

class UserAppService extends ApplicationService {
    private driverManager: DriverManager

    constructor() {
        super()
        this.driverManager = new DriverManager()
    }

    async getDriver(id: ObjectId): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            const entity = await this.driverManager.get(id)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertDriver(driverInsert: IUserInsert): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            const entity = await this.driverManager.insert(driverInsert)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriver(driverUpdate: IUserUpdate): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.update(driverUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverProfilePhoto(driverUpdate: IUserUpdateProfilePhoto): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updateProfilePhoto(driverUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverLicencePhoto(driverUpdate: IUserUpdateLicencePhoto): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updateLicencePhoto(driverUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverPoliceRecord(driverUpdate: IUserUpdatePoliceRecord): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IdNotProvided))
            }

            const entity = await this.driverManager.updatePoliceRecord(driverUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverPassword(driverUpdate: IUserUpdatePassword): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()
        try {
            if (!driverUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(UserErrorCodes.IdNotProvided))
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

export default UserAppService
