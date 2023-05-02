import { ObjectId } from "mongodb"

import Driver from "../domain/driver.entity"
import DriverModel from "../domain/driver.model"
import {
    Repository,
    IRepository
} from "../../../core/infrastructure/repository"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class DriverRepository extends Repository<Driver> implements IRepository<Driver> {
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
        await document.save(this.optionsToInsert())

        const createdEntity = this.castToEntity(document)
        return createdEntity
    }

    async update(entity: Driver): Promise<Driver> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await DriverModel.findOneAndUpdate({_id: entity._id }, dataToUpdate, this.optionsToUpdate())
        
        const updatedEntity = this.castToEntity(document)
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await DriverModel.findOneAndUpdate({_id: id }, this.paramsToDelete(), this.optionsToUpdate())
    }

    private castToEntity(document: any): Driver {
        if (!document) {
            return null
        }

        const entity = new Driver(document)
        entity.identification = document.identification
        entity.name = document.name
        entity.lastName = document.lastName
        entity.birthdate = document.birthdate
        entity.email = document.email
        entity.cellPhone = document.cellPhone
        entity.profilePhoto = document.profilePhoto
        entity.licencePhoto = document.licencePhoto
        entity.policeRecord = document.policeRecord

        return entity
    }
}

export default DriverRepository
