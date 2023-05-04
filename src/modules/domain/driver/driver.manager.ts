import { ObjectId, Transaction } from "mongodb"

import Driver from "./driver.entity"
import IDriverInsert from "../../contracts/driver/driver.insert"
import ServiceException from "../../shared/service.exception"
import DriverErrorCodes from "../../shared.domain/driver/driver.error.codes"

import {
    SharedConsts,
    TypeMime
} from "../../shared/shared.consts"
import {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord
} from "../../contracts/driver/driver.update"
import DriverRepository from "./driver.repository"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"

/**
 * This class, performs operations between the CRUD methods from the Repository
 */
class DriverManager {
    private driverRepository: DriverRepository

    constructor(transaction?: TransactionSession) {
        this.driverRepository = new DriverRepository(transaction)
    }

    async get(id: ObjectId): Promise<Driver> {
        const driver = await this.driverRepository.get(id)
        if (!driver) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return driver
    }

    async insert(driverInsert: IDriverInsert): Promise<Driver> {
        const driver = new Driver()
        driver.identification = {
            data: driverInsert.identification,
            isVerified: false
        }
        driver.name = driverInsert.name
        driver.lastName = driverInsert.lastName
        driver.birthdate = driverInsert.birthdate
        driver.email = {
            data: driverInsert.email,
            isVerified: false
        }
        driver.cellPhone = {
            data: driverInsert.cellPhone,
            isVerified: false
        }
        driver.profilePhoto = {
            data: Buffer.from(driverInsert.profilePhoto, TypeMime.base64),
            isApproved: false
        }
        driver.licencePhoto = {
            data: Buffer.from(driverInsert.licencePhoto, TypeMime.base64),
            isApproved: false
        }
        driver.policeRecord = {
            data: Buffer.from(driverInsert.policeRecord, TypeMime.base64),
            isApproved: false
        }

        const entity = await this.driverRepository.insert(driver)
        return entity
    }

    async update(driverUpdate: IDriverUpdate): Promise<Driver> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const driver = new Driver()
        driver._id = driverUpdate.id
        driver.identification = {
            data: driverUpdate.identification,
            isVerified: driverFound.identification.isVerified
        }
        driver.name = driverUpdate.name
        driver.lastName = driverUpdate.lastName
        driver.birthdate = driverUpdate.birthdate
        driver.email = {
            data: driverUpdate.email,
            isVerified: driverFound.email.isVerified
        }
        driver.cellPhone = {
            data: driverUpdate.cellPhone,
            isVerified: driverFound.cellPhone.isVerified
        }

        const entity = await this.driverRepository.update(driver)
        return entity
    }

    async updateProfilePhoto(driverUpdate: IDriverUpdateProfilePhoto): Promise<Driver> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const driver = new Driver()
        driver._id = driverUpdate.id
        driver.profilePhoto = {
            data: Buffer.from(driverUpdate.profilePhoto, TypeMime.base64),
            isApproved: driverFound.profilePhoto.isApproved
        }

        const entity = await this.driverRepository.update(driver)
        return entity
    }

    async updateLicencePhoto(driverUpdate: IDriverUpdateLicencePhoto): Promise<Driver> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const driver = new Driver()
        driver._id = driverUpdate.id
        driver.profilePhoto = {
            data: Buffer.from(driverUpdate.licencePhoto, TypeMime.base64),
            isApproved: driverFound.licencePhoto.isApproved
        }

        const entity = await this.driverRepository.update(driver)
        return entity
    }

    async updatePoliceRecord(driverUpdate: IDriverUpdatePoliceRecord): Promise<Driver> {
        const driverFound = await this.driverRepository.get(driverUpdate.id)
        if (!driverFound) {
            const errorParams = {
                [SharedConsts.id]: driverUpdate.id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        const driver = new Driver()
        driver._id = driverUpdate.id
        driver.profilePhoto = {
            data: Buffer.from(driverUpdate.policeRecord, TypeMime.base64),
            isApproved: driverFound.policeRecord.isApproved
        }

        const entity = await this.driverRepository.update(driver)
        return entity
    }

    async delete(id: ObjectId): Promise<void> {
        const entity = await this.driverRepository.get(id)
        if (!entity) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        await this.driverRepository.delete(id)
    }
}

export default DriverManager
