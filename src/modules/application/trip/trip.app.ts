import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"

import { mapper } from "../../../core/mappings/mapper"
import ITripInsert from "../../contracts/trip/trip.insert"
import Trip from "../../domain/trip/trip.entity"
import { TripDto } from "../../contracts/trip/trip.dto"
import TripManager from "../../domain/trip/trip.manager"
import { ITripCancel } from "../../contracts/trip/trip.update"
import VehicleErrorCodes from "../../shared.domain/vehicle/vehicle.error.codes"
import VehicleManager from "../../domain/vehicle/vehicle.manager"

class TripAppService extends ApplicationService {
    private tripManager: TripManager
    private vehicleManager: VehicleManager

    constructor() {
        super()
        this.tripManager = new TripManager()
        this.vehicleManager = new VehicleManager()
    }

    async getTrip(id: ObjectId): Promise<Response<TripDto>> {
        const response = new ResponseManager<TripDto>()

        try {
            const entity = await this.tripManager.get(id)

            const dto = mapper.map(entity, Trip, TripDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertTrip(tripInsert: ITripInsert): Promise<Response<TripDto>> {
        const response = new ResponseManager<TripDto>()

        try {
            const vehicle = await this.vehicleManager.get(tripInsert.vehicleId)
            if (!vehicle) {
                throw new ServiceException(ServiceError.getErrorByCode(VehicleErrorCodes.EntityNotFound))
            }

            const entity = await this.tripManager.insert(tripInsert)

            const dto = mapper.map(entity, Trip, TripDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async finishTrip(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.tripManager.finish(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async cancelTrip(tripCancel: ITripCancel): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.tripManager.cancel(tripCancel)

            return response.onSuccess(tripCancel.id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default TripAppService
