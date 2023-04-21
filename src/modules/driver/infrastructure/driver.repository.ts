import { ObjectId } from "mongodb"

import Driver from "../domain/driver.entity"
import DriverModel from "../domain/driver.model"
import Repository from "../../../core/repository/repository"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class DriverRepository implements Repository<Driver> {

    async get(id: ObjectId): Promise<Driver> {
        const document = await DriverModel.findById(id)
        
        const entity = this.castToEntity(document)
        return entity
    }

    async insert(entity: Driver): Promise<Driver> {
        const document = new DriverModel({...entity})
        await document.save()
        
        const createdEntity = this.castToEntity(document)
        return createdEntity
    }

    async update(entity: Driver): Promise<Driver> {
        const document = await DriverModel.findByIdAndUpdate(entity._id, entity)
        const updatedEntity = this.castToEntity(document)
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await DriverModel.findByIdAndDelete(id)
    }

    private castToEntity(document: any): Driver {
        const entity = new Driver()
        entity._id = document.id
        entity.createdAt = document.createdAt
        entity.creatorId = document.creatorId
        entity.updatedAt = document.updatedAt
        entity.updaterId = document.updaterId
        entity.IsDeleted = document.IsDeleted
        entity.deletedAt = document.deletedAt
        entity.deleterId = document.deleterId

        entity.identification = document.identification
        entity.name = document.name
        entity.lastName = document.lastName
        entity.email = document.email
        entity.phone = document.phone

        return entity
    }
}

export default DriverRepository
