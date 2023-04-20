import { ObjectId } from "mongodb"

import Driver from "../domain/driver.entity"
import DriverModel from "../domain/driver.model"
import Repository from "../../../core/repository/repository"

// El repo es para las operaciones puras y duras en BD
class DriverRepository implements Repository<Driver> {

    async get(id: ObjectId): Promise<Driver> {
        const document = await DriverModel.findById(id)
        const entity = new Driver()
        return entity
    }

    async save(entity: Driver): Promise<Driver> {
        const newDocument = new DriverModel({...entity})
        await newDocument.save()
        return entity
    }

    async update(entity: Driver): Promise<Driver> {
        await DriverModel.findByIdAndUpdate(entity._id, entity)
        return entity
    }

    async delete(id: ObjectId): Promise<void> {
        await DriverModel.findByIdAndDelete(id)
    }
}

export default DriverRepository
