import { ObjectId } from "mongodb"

import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import LocalizeError from "../../shared/localize_error"
import Rating from "../../domain/rating/rating.entity"
import RatingManager from "../../domain/rating/rating.manager"
import UserManager from "../../domain/user/user.manager"
import IRatingInsert from "../../contracts/rating/rating.insert"
import TripManager from "../../domain/trip/trip.manager"

import { mapper } from "../../../core/mappings/mapper"
import {
    RatingDto
} from "../../contracts/rating/rating.dto"
import { TripState } from "../../shared.domain/trip/trip.extra"
import ServiceException from "../../shared/service.exception"
import TripErrorCodes from "../../shared.domain/trip/trip.error.codes"

class RatingAppService extends ApplicationService {
    private ratingManager: RatingManager
    private userManager: UserManager
    private tripManager: TripManager

    constructor() {
        super()
        this.ratingManager = new RatingManager()
        this.userManager = new UserManager()
        this.tripManager = new TripManager()
    }

    async getRating(id: ObjectId): Promise<Response<RatingDto>> {
        const response = new ResponseManager<RatingDto>()

        try {
            const entity = await this.ratingManager.get(id)

            const dto = mapper.map(entity, Rating, RatingDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async getRatingsByUser(userId: ObjectId): Promise<Response<RatingDto[]>> {
        const response = new ResponseManager<RatingDto[]>()

        try {
            await this.userManager.get(userId)
            const entities = await this.ratingManager.getRatingsByUser(userId)

            const dto = mapper.mapArray(entities, Rating, RatingDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertRating(ratingInsert: IRatingInsert): Promise<Response<RatingDto>> {
        const response = new ResponseManager<RatingDto>()

        try {
            await this.userManager.get(ratingInsert.userId)
            const trip = await this.tripManager.get(ratingInsert.tripId)
            const isFinished = trip.tripState.some(element => element.isCurrent && element.state === TripState.Finished)
            if (!isFinished) {
                throw new ServiceException(LocalizeError.getErrorByCode(TripErrorCodes.TripNotFinished))
            }

            const entity = await this.ratingManager.insert(ratingInsert)

            const dto = mapper.map(entity, Rating, RatingDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteRating(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.ratingManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default RatingAppService
