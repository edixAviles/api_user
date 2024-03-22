import { ObjectId } from "mongodb"
import ApplicationService from "api_utility/src/application/application_service"
import Response from "api_utility/src/response/response"
import ResponseManager from "api_utility/src/response/response_manager"
import ServiceException from "api_utility/src/exception/service_exception"
import ServiceError from "api_utility/src/error/service_error"

import LocalizeError from "../../shared/localize_error"
import User from "../../domain/user/user.entity"
import UserManager from "../../domain/user/user.manager"
import IUserInsert from "../../contracts/user/user.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { UserDto } from "../../contracts/user/user.dto"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IUserUpdatePassword,
    IUserUpdateToDriver
} from "../../contracts/user/user.update"

class UserAppService extends ApplicationService {
    private userManager: UserManager

    constructor() {
        super()
        this.userManager = new UserManager()
    }

    async getUser(id: ObjectId): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            const entity = await this.userManager.get(id)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertUser(userInsert: IUserInsert): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            if (userInsert.isDriver && (!userInsert.licencePhoto || !userInsert.policeRecord)) {
                const error = LocalizeError.getErrorByCode(UserErrorCodes.DriverDataNotComplete)
                throw new ServiceException(error)
            }
            const entity = await this.userManager.insert(userInsert)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async beDriver(userUpdate: IUserUpdateToDriver): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.userManager.beDriver(userUpdate)
            return response.onSuccess(userUpdate.id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateUser(userUpdate: IUserUpdate): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()

        try {
            const entity = await this.userManager.update(userUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateUserProfilePhoto(userUpdate: IUserUpdateProfilePhoto): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            const entity = await this.userManager.updateProfilePhoto(userUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverLicencePhoto(userUpdate: IDriverUpdateLicencePhoto): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            const entity = await this.userManager.updateLicencePhoto(userUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateDriverPoliceRecord(userUpdate: IDriverUpdatePoliceRecord): Promise<Response<UserDto>> {
        const response = new ResponseManager<UserDto>()
        try {
            const entity = await this.userManager.updatePoliceRecord(userUpdate)

            const dto = mapper.map(entity, User, UserDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateUserPassword(userUpdate: IUserUpdatePassword): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()
        try {
            await this.userManager.updatePassword(userUpdate)
            
            return response.onSuccess(userUpdate.id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteUser(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.userManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default UserAppService
