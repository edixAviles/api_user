import { ObjectId } from "mongodb"
import CryptoJS from "crypto-js"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import LocalizeError from "../../shared/localize_error"
import User from "./user.entity"
import UserRepository from "./user.repository"
import IUserInsert from "../../contracts/user/user.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import {
    EntityFields,
    TypeMime
} from "../../shared/shared.consts"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IUserUpdatePassword,
    IUserUpdateToDriver
} from "../../contracts/user/user.update"

/**
 * This class, performs operations between the CRUD methods from the Repository
 */
class UserManager {
    private userRepository: UserRepository

    constructor(transaction?: TransactionSession) {
        this.userRepository = new UserRepository(transaction)
    }

    async get(id: ObjectId): Promise<User> {
        const entity = await this.foundEntity(id)
        return entity
    }

    async insert(userInsert: IUserInsert): Promise<User> {
        const encryptedPassword = CryptoJS.SHA256(userInsert.password).toString()

        const user = new User()
        user.name = userInsert.name
        user.lastName = userInsert.lastName
        user.birthdate = userInsert.birthdate
        user.email = {
            data: userInsert.email,
            isVerified: false
        }
        user.cellPhone = {
            data: userInsert.cellPhone,
            isVerified: false
        }
        user.profilePhoto = {
            data: Buffer.from(userInsert.profilePhoto, TypeMime.base64),
            isApproved: false
        }
        user.isDriver = userInsert.isDriver
        user.password = encryptedPassword

        if (userInsert.isDriver) {
            user.licencePhoto = {
                data: Buffer.from(userInsert.licencePhoto, TypeMime.base64),
                isApproved: false
            }
            user.policeRecord = {
                data: Buffer.from(userInsert.policeRecord, TypeMime.base64),
                isApproved: false
            }
        }

        const entity = await this.userRepository.insert(user)
        return entity
    }

    async update(userUpdate: IUserUpdate): Promise<User> {
        const entity = await this.foundEntity(userUpdate.id)

        const user = new User()
        user._id = userUpdate.id
        user.name = userUpdate.name
        user.lastName = userUpdate.lastName
        user.birthdate = userUpdate.birthdate

        user.email = {
            data: userUpdate.email,
            isVerified: userUpdate.email === entity.email.data ? entity.email.isVerified : false
        }
        user.cellPhone = {
            data: userUpdate.cellPhone,
            isVerified: userUpdate.cellPhone === entity.cellPhone.data ? entity.cellPhone.isVerified : false
        }

        const entityUpdated = await this.userRepository.update(user)
        return entityUpdated
    }

    async beDriver(userUpdate: IUserUpdateToDriver): Promise<User> {
        const entity = await this.foundEntity(userUpdate.id)

        if (entity.isDriver) {
            const error = LocalizeError.getErrorByCode(UserErrorCodes.IsAlreadyDriver)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = entity._id
        user.isDriver = true
        user.licencePhoto = {
            data: Buffer.from(userUpdate.licencePhoto, TypeMime.base64),
            isApproved: false
        }
        user.policeRecord = {
            data: Buffer.from(userUpdate.policeRecord, TypeMime.base64),
            isApproved: false
        }

        const entityUpdated = await this.userRepository.update(user)
        return entityUpdated
    }

    async updateProfilePhoto(userUpdate: IUserUpdateProfilePhoto): Promise<User> {
        const entity = await this.foundEntity(userUpdate.id)

        const user = new User()
        user._id = userUpdate.id
        user.profilePhoto = {
            data: Buffer.from(userUpdate.profilePhoto, TypeMime.base64),
            isApproved: false
        }

        const entityUpdated = await this.userRepository.update(user)
        return entityUpdated
    }

    async updateLicencePhoto(userUpdate: IDriverUpdateLicencePhoto): Promise<User> {
        const entity = await this.foundEntity(userUpdate.id)

        if (!entity.isDriver) {
            const error = LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = userUpdate.id
        user.profilePhoto = {
            data: Buffer.from(userUpdate.licencePhoto, TypeMime.base64),
            isApproved: false
        }

        const entityUpdated = await this.userRepository.update(user)
        return entityUpdated
    }

    async updatePoliceRecord(userUpdate: IDriverUpdatePoliceRecord): Promise<User> {
        const entity = await this.foundEntity(userUpdate.id)

        if (!entity.isDriver) {
            const error = LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = userUpdate.id
        user.profilePhoto = {
            data: Buffer.from(userUpdate.policeRecord, TypeMime.base64),
            isApproved: false
        }

        const entityUpdated = await this.userRepository.update(user)
        return entityUpdated
    }

    async updatePassword(userUpdate: IUserUpdatePassword): Promise<void> {
        const entity = await this.foundEntity(userUpdate.id)

        const currentEncryptedPassword = CryptoJS.SHA256(userUpdate.currentPassword).toString()
        if (entity.password != currentEncryptedPassword) {
            const error = LocalizeError.getErrorByCode(UserErrorCodes.IncorrectCurrentPassword)
            throw new ServiceException(error)
        }

        const newEncryptedPassword = CryptoJS.SHA256(userUpdate.newPassword).toString()
        const user = new User()
        user._id = userUpdate.id
        user.password = newEncryptedPassword

        await this.userRepository.update(user)
    }

    async delete(id: ObjectId): Promise<void> {
        await this.foundEntity(id)
        await this.userRepository.delete(id)
    }

    private foundEntity = async (id: ObjectId): Promise<User> => {
        const entity = await this.userRepository.get(id)
        if (!entity) {
            const errorParams = { [EntityFields.id]: id }
            const error = LocalizeError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return entity
    }
}

export default UserManager
