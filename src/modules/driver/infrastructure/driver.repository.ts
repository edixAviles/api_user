import { ObjectId } from "mongodb"

import Driver from "../domain/driver.entity"
import DriverModel from "../domain/driver.model"
import Repository from "../../../core/repository/repository"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class DriverRepository implements Repository<Driver> {

    async get(id: ObjectId): Promise<Driver> {
        const filter = {
            _id: id,
            isDeleted: { $ne: true }
        }
        const document = await DriverModel.findOne(filter)

        const entity = this.castToEntity(document)
        return entity
    }

    async insert(entity: Driver): Promise<Driver> {
        const document = new DriverModel({ ...entity })
        await document.save()

        const createdEntity = this.castToEntity(document)
        return createdEntity
    }

    async update(entity: Driver): Promise<Driver> {
        const document = await DriverModel.findByIdAndUpdate(entity._id, entity, { new: true })
        const updatedEntity = this.castToEntity(document)
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        const params = {
            isDeleted: true,
            deletedAt: new Date()
        }
        await DriverModel.findByIdAndUpdate(id, params)
    }

    private castToEntity(document: any): Driver {
        if (!document) {
            return null
        }

        const entity = new Driver(document)
        entity.identification = document.identification
        entity.name = document.name
        entity.lastName = document.lastName
        entity.email = document.email
        entity.phone = document.phone

        return entity
    }
}

export default DriverRepository
