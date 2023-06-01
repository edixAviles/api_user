import { ObjectId } from "mongodb"

import {
    Repository,
    IRepository
} from "../../../core/domain/repository"
import Trip from "./trip.entity"
import TripModel from "./trip.model"

class TripRepository extends Repository<Trip> implements IRepository<Trip> {
    async get(id: ObjectId): Promise<Trip> {
        const document = await TripModel.findOne(this.filterToGet(id))

        const entity = new Trip({ ...document })
        return document ? entity : null
    }

    async insert(entity: Trip): Promise<Trip> {
        const document = new TripModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new Trip({ ...document })
        return createdEntity
    }

    async update(entity: Trip): Promise<Trip> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await TripModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new Trip({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await TripModel.findOneAndUpdate(
            { _id: id },
            this.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default TripRepository
