import Driver from "../domain/driver.entity"
import DriverRepository from "./driver.repository"
import DriverInsert from "../shared/domain/driver.insert"
import DriverUpdate from "../shared/domain/driver.update"
import { ObjectId } from "mongodb"
import DriverException from "../shared/exception/driver.exception"
import DriverErrorCodes from "../shared/exception/driver.error.codes"
import sharedConsts from "../shared/shared.consts"

/**
 * This class, performs operations between the CRUD methods from the Repository
 */
class DriverManager {
    private driverRepository = new DriverRepository()

    async get(id: ObjectId): Promise<Driver> {
        const entity = await this.driverRepository.get(id)
        if (!entity) {
            const errorParams = {
                [sharedConsts.id]: id
            }
            const error = DriverErrorCodes.getError(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new DriverException(error)
        }

        return entity
    }

    async insert(driverInsert: DriverInsert): Promise<Driver> {
        const driver = new Driver()
        driver.identification = driverInsert.identification
        driver.name = driverInsert.name
        driver.lastName = driverInsert.lastName
        driver.email = driverInsert.email
        driver.phone = driverInsert.phone

        const entity = await this.driverRepository.insert(driver)
        return entity
    }

    async update(driverUpdate: DriverUpdate): Promise<Driver> {
        const findEntity = await this.driverRepository.get(driverUpdate._id)
        if (!findEntity) {
            const errorParams = {
                [sharedConsts.id]: driverUpdate._id
            }
            const error = DriverErrorCodes.getError(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new DriverException(error)
        }

        const driver = new Driver()
        driver._id = driverUpdate._id
        driver.identification = driverUpdate.identification
        driver.name = driverUpdate.name
        driver.lastName = driverUpdate.lastName
        driver.email = driverUpdate.email
        driver.phone = driverUpdate.phone
        
        const entity = await this.driverRepository.update(driver)
        return entity
    }

    async delete(id: ObjectId): Promise<void> {
        const entity = await this.driverRepository.get(id)
        if (!entity) {
            const errorParams = {
                [sharedConsts.id]: id
            }
            const error = DriverErrorCodes.getError(DriverErrorCodes.DriverErrorEntityNotFound, errorParams)
            throw new DriverException(error)
        }
        
        await this.driverRepository.delete(id)
    }
}

export default DriverManager
