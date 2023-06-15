import { ObjectId } from "mongodb"

import Vehicle from "./vehicle.entity"
import VehicleModel from "./vehicle.model"
import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

class VehicleRepository extends Repository<Vehicle> implements IRepository<Vehicle> {
    async get(id: ObjectId): Promise<Vehicle> {
        const document = await VehicleModel.findOne(Repository.filterToGetById(id))

        const entity = new Vehicle({ ...document })
        return document ? entity : null
    }

    async getVehiclesByDriver(driverId: ObjectId): Promise<Vehicle[]> {
        const filter = {
            ...Repository.filterToGetActive(),
            driverId
        }
        const documents = await VehicleModel.find(filter)

        const entities = new Array<Vehicle>()
        documents.forEach(document => {
            if (document) {
                entities.push(new Vehicle({ ...document }))
            }
        })

        return entities
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
            Repository.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default VehicleRepository
