import { ObjectId } from "mongodb"

import User from "./user.entity"
import DriverModel from "./user.model"

import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class DriverRepository extends Repository<User> implements IRepository<User> {
    async get(id: ObjectId): Promise<User> {
        const document = await DriverModel.findOne(Repository.filterToGetById(id))

        const entity = new User({ ...document })
        return document ? entity : null
    }

    async insert(entity: User): Promise<User> {
        const document = new DriverModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new User({ ...document })
        return createdEntity
    }

    async update(entity: User): Promise<User> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await DriverModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new User({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await DriverModel.findOneAndUpdate(
            { _id: id },
            Repository.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default DriverRepository
