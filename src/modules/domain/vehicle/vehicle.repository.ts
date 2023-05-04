import { ObjectId } from "mongodb"

import Vehicle from "./vehicle.entity"
import VehicleModel from "./vehicle.model"
import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

class VehicleRepository extends Repository<Vehicle> implements IRepository<Vehicle> {
    async get(id: ObjectId): Promise<Vehicle> {
        const document = await VehicleModel.findOne(this.filterToGet(id))

        const entity = new Vehicle({ ...document })
        return document ? entity : null
    }

    async insert(entity: Vehicle): Promise<Vehicle> {
        const document = new VehicleModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new Vehicle({ ...document })
        return createdEntity
    }

    async update(entity: Vehicle): Promise<Vehicle> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await VehicleModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new Vehicle({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await VehicleModel.findOneAndUpdate(
            { _id: id },
            this.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default VehicleRepository
