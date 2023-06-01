import { ObjectId } from "mongodb"
import CryptoJS from "crypto-js"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"
import User from "./user.entity"
import UserRepository from "./user.repository"
import IUserInsert from "../../contracts/user/user.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import {
    SharedConsts,
    TypeMime
} from "../../shared/shared.consts"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdatePassword
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
        const user = await this.userRepository.get(id)
        if (!user) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return user
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
        user.password = encryptedPassword

        const entity = await this.userRepository.insert(user)
        return entity
    }

    async update(userUpdate: IUserUpdate): Promise<User> {
        const userFound = await this.userRepository.get(userUpdate.id)
        if (!userFound) {
            const errorParams = {
                [SharedConsts.id]: userUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = userUpdate.id
        user.name = userUpdate.name
        user.lastName = userUpdate.lastName
        user.birthdate = userUpdate.birthdate
        user.email = {
            data: userUpdate.email,
            isVerified: userFound.email.isVerified
        }
        user.cellPhone = {
            data: userUpdate.cellPhone,
            isVerified: userFound.cellPhone.isVerified
        }

        const entity = await this.userRepository.update(user)
        return entity
    }

    async updateProfilePhoto(userUpdate: IUserUpdateProfilePhoto): Promise<User> {
        const userFound = await this.userRepository.get(userUpdate.id)
        if (!userFound) {
            const errorParams = {
                [SharedConsts.id]: userUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const user = new User()
        user._id = userUpdate.id
        user.profilePhoto = {
            data: Buffer.from(userUpdate.profilePhoto, TypeMime.base64),
            isApproved: userFound.profilePhoto.isApproved
        }

        const entity = await this.userRepository.update(user)
        return entity
    }

    async updatePassword(userUpdate: IUserUpdatePassword): Promise<void> {
        const userFound = await this.userRepository.get(userUpdate.id)
        if (!userFound) {
            const errorParams = {
                [SharedConsts.id]: userUpdate.id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const currentEncryptedPassword = CryptoJS.SHA256(userUpdate.currentPassword).toString()
        if (userFound.password != currentEncryptedPassword) {
            const error = ServiceError.getErrorByCode(UserErrorCodes.IncorrectCurrentPassword)
            throw new ServiceException(error)
        }

        const newEncryptedPassword = CryptoJS.SHA256(userUpdate.newPassword).toString()
        const user = new User()
        user._id = userUpdate.id
        user.password = newEncryptedPassword

        await this.userRepository.update(user)
    }

    async delete(id: ObjectId): Promise<void> {
        const entity = await this.userRepository.get(id)
        if (!entity) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(UserErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        await this.userRepository.delete(id)
    }
}

export default UserManager
