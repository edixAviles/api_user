import { ObjectId } from "mongodb"

import {
    Repository,
    IRepository
} from "../../../core/domain/repository"
import Trip from "./trip.entity"
import TripModel from "./trip.model"
import { PipelineStage } from "mongoose"
import { CollectionsName } from "../../shared/shared.consts"
import { TripState } from "../../shared.domain/trip/trip.extra"

class TripRepository extends Repository<Trip> implements IRepository<Trip> {
    async get(id: ObjectId): Promise<Trip> {
        const document = await TripModel.findOne(Repository.filterToGetById(id))
        const entity = new Trip({ ...document })
        return document ? entity : null
    }

    async getTripsByUser(userId: ObjectId, state: TripState): Promise<Trip[]> {
        const filter: PipelineStage[] = [
            {
                $lookup: {
                    from: CollectionsName.Vehicle,
                    localField: "vehicleId",
                    foreignField: "_id",
                    as: "vehiclesList"
                }
            },
            {
                $match: {
                    ...Repository.filterToGetActive(),
                    "vehiclesList.userId": userId,
                    tripState: {
                        $elemMatch: {
                            state,
                            isCurrent: true
                        }
                    }
                }
            }
        ]
        const documents = await TripModel.aggregate(filter)

        const entities = new Array<Trip>()
        documents.forEach(document => {
            if (document) {
                delete document.vehicles;
                entities.push(new Trip({ ...document }))
            }
        })

        return entities
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
            Repository.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default TripRepository
