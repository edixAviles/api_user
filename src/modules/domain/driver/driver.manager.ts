import { ObjectId } from "mongodb"
import CryptoJS from "crypto-js"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"
import User from "./user.entity"
import DriverRepository from "./user.repository"
import IUserInsert from "../../contracts/user/user.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import {
    SharedConsts,
    TypeMime
} from "../../shared/shared.consts"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdateLicencePhoto,
    IUserUpdatePoliceRecord,
    IUserUpdatePassword
} from "../../contracts/user/user.update"

/**
 * This class, performs operations between the CRUD methods from the Repository
 */
class DriverManager {
    private driverRepository: DriverRepository

    constructor(transaction?: TransactionSession) {
        this.driverRepository = new DriverRepository(transaction)
    }

    async get(id: ObjectId): Promise<User> {
        const user = await this.driverRepository.get(id)
        if (!user) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return user
    }

    async insert(driverInsert: IUserInsert): Promise<User> {
        const encryptedPassword = CryptoJS.SHA256(driverInsert.password).toString()
        
        const user = new User()
        user.identification = {
            data: driverInsert.identification,
            isVerified: false
        }
        user.name = driverInsert.name
        user.lastName = driverInsert.lastName
        user.birthdate = driverInsert.birthdate
        user.email = {
            data: driverInsert.email,
            isVerified: false
        }
        user.cellPhone = {
            data: driverInsert.cellPhone,
            isVerified: false
        }
        user.profilePhoto = {
            data: Buffer.from(driverInsert.profilePhoto, TypeMime.base64),
            isApproved: false
        }
        user.licencePhoto = {
            data: Buffer.from(driverInsert.licencePhoto, TypeMime.base64),
            isApproved: false
        }
        user.policeRecord = {
            data: Buffer.from(driverInsert.policeRecord, TypeMime.base64),
            isApproved: false
        }
        user.password = encryptedPassword

        const entity = await this.driverRepository.insert(user)
        return entity
    }

    async update(driverUpdate: IUserUpdate): Promise<User> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = driverUpdate.id
        user.identification = {
            data: driverUpdate.identification,
            isVerified: driverFound.identification.isVerified
        }
        user.name = driverUpdate.name
        user.lastName = driverUpdate.lastName
        user.birthdate = driverUpdate.birthdate
        user.email = {
            data: driverUpdate.email,
            isVerified: driverFound.email.isVerified
        }
        user.cellPhone = {
            data: driverUpdate.cellPhone,
            isVerified: driverFound.cellPhone.isVerified
        }

        const entity = await this.driverRepository.update(user)
        return entity
    }

    async updateProfilePhoto(driverUpdate: IUserUpdateProfilePhoto): Promise<User> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = driverUpdate.id
        user.profilePhoto = {
            data: Buffer.from(driverUpdate.profilePhoto, TypeMime.base64),
            isApproved: driverFound.profilePhoto.isApproved
        }

        const entity = await this.driverRepository.update(user)
        return entity
    }

    async updateLicencePhoto(driverUpdate: IUserUpdateLicencePhoto): Promise<User> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = driverUpdate.id
        user.profilePhoto = {
            data: Buffer.from(driverUpdate.licencePhoto, TypeMime.base64),
            isApproved: driverFound.licencePhoto.isApproved
        }

        const entity = await this.driverRepository.update(user)
        return entity
    }

    async updatePoliceRecord(driverUpdate: IUserUpdatePoliceRecord): Promise<User> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = driverUpdate.id
        user.profilePhoto = {
            data: Buffer.from(driverUpdate.policeRecord, TypeMime.base64),
            isApproved: driverFound.policeRecord.isApproved
        }

        const entity = await this.driverRepository.update(user)
        return entity
    }

    async updatePassword(driverUpdate: IUserUpdatePassword): Promise<void> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const currentEncryptedPassword = CryptoJS.SHA256(driverUpdate.currentPassword).toString()
        if (driverFound.password != currentEncryptedPassword) {
            const error = ServiceError.getErrorByCode(UserErrorCodes.IncorrectCurrentPassword)
            throw new ServiceException(error)
        }

        const newEncryptedPassword = CryptoJS.SHA256(driverUpdate.newPassword).toString()
        const user = new User()
        user._id = driverUpdate.id
        user.password = newEncryptedPassword

        await this.driverRepository.update(user)
    }

    async delete(id: ObjectId): Promise<void> {
        const entity = await this.driverRepository.get(id)
        if (!entity) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        await this.driverRepository.delete(id)
    }
}

export default DriverManager
