import { ObjectId } from "mongodb"

import Driver from "./driver.entity"
import DriverModel from "./driver.model"

import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class DriverRepository extends Repository<Driver> implements IRepository<Driver> {
    async get(id: ObjectId): Promise<Driver> {
        const document = await DriverModel.findOne(this.filterToGet(id))

        const entity = new Driver({ ...document })
        return document ? entity : null
    }

    async insert(entity: Driver): Promise<Driver> {
        const document = new DriverModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new Driver({ ...document })
        return createdEntity
    }

    async update(entity: Driver): Promise<Driver> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await DriverModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new Driver({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await DriverModel.findOneAndUpdate(
            { _id: id },
            this.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default DriverRepository
