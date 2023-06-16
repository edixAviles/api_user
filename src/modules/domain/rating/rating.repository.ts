import { ObjectId } from "mongodb"

import Rating from "./rating.entity"
import RatingModel from "./rating.model"
import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

class RatingRepository extends Repository<Rating> implements IRepository<Rating> {
    async get(id: ObjectId): Promise<Rating> {
        const document = await RatingModel.findOne(Repository.filterToGetById(id))

        const entity = new Rating({ ...document })
        return document ? entity : null
    }

    async getRatingsByUser(userId: ObjectId): Promise<Rating[]> {
        const filter = {
            ...Repository.filterToGetActive(),
            userId
        }
        const documents = await RatingModel.find(filter)

        const entities = new Array<Rating>()
        documents.forEach(document => {
            if (document) {
                entities.push(new Rating({ ...document }))
            }
        })

        return entities
    }

    async getRatingByUserAndTrip(userId: ObjectId, tripId: ObjectId): Promise<Rating> {
        const filter = {
            ...Repository.filterToGetActive(),
            userId,
            tripId
        }
        const document = await RatingModel.findOne(filter)
        
        const entity = new Rating({ ...document })
        return document ? entity : null
    }

    async insert(entity: Rating): Promise<Rating> {
        const document = new RatingModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new Rating({ ...document })
        return createdEntity
    }

    async update(entity: Rating): Promise<Rating> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await RatingModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new Rating({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await RatingModel.findOneAndUpdate(
            { _id: id },
            Repository.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default RatingRepository
