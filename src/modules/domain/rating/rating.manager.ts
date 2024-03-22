import { ObjectId } from "mongodb"
import ServiceException from "api_utility/src/exception/service_exception"
import TransactionSession from "api_utility/src/database/transaction_session"
import EntityFields from "api_utility/src/domain/entity_fields"

import LocalizeError from "../../shared/localize_error"
import Rating from "./rating.entity"
import RatingRepository from "./rating.repository"
import RatingErrorCodes from "../../shared.domain/rating/rating.error.codes"
import IRatingInsert from "../../contracts/rating/rating.insert"

class RatingManager {
    private ratingRepository: RatingRepository

    constructor(transaction?: TransactionSession) {
        this.ratingRepository = new RatingRepository(transaction)
    }

    async get(id: ObjectId): Promise<Rating> {
        const entity = await this.foundEntity(id)
        return entity
    }

    async getRatingsByUser(userId: ObjectId): Promise<Rating[]> {
        const ratings = await this.ratingRepository.getRatingsByUser(userId)
        return ratings
    }

    async getRatingByUserAndTrip(userId: ObjectId, tripId: ObjectId): Promise<Rating | null> {
        const rating = await this.ratingRepository.getRatingByUserAndTrip(userId, tripId)
        return rating
    }

    async insert(ratingInsert: IRatingInsert): Promise<Rating> {
        const ratingFound = await this.getRatingByUserAndTrip(ratingInsert.userId, ratingInsert.tripId)
        if (ratingFound) {
            throw new ServiceException(LocalizeError.getErrorByCode(RatingErrorCodes.TripIsAlreadyRated))
        }

        const rating = new Rating()
        rating.rating = ratingInsert.rating
        rating.comment = ratingInsert.comment
        rating.userId = ratingInsert.userId
        rating.tripId = ratingInsert.tripId

        const entity = await this.ratingRepository.insert(rating)
        return entity
    }

    async delete(id: ObjectId): Promise<void> {
        await this.foundEntity(id)
        await this.ratingRepository.delete(id)
    }

    private foundEntity = async (id: ObjectId): Promise<Rating> => {
        const rating = await this.ratingRepository.get(id)
        if (!rating) {
            const errorParams = new Map<string, string>([[EntityFields.id, id.toString()]])
            const error = LocalizeError.getErrorByCode(RatingErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return rating
    }
}

export default RatingManager
