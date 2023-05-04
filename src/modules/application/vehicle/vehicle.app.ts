import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import Vehicle from "../../domain/vehicle/vehicle.entity"
import VehicleManager from "../../domain/vehicle/vehicle.manager"
import IVehicleInsert from "../../contracts/vehicle/vehicle.insert"
import VehicleErrorCodes from "../../shared.domain/vehicle/vehicle.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { VehicleDto } from "../../contracts/vehicle/vehicle.dto"
import {
    IVehicleUpdate
} from "../../contracts/vehicle/vehicle.update"

class VehicleAppService extends ApplicationService {

    async getVehicle(id: ObjectId): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            const vehicleManager = new VehicleManager()
            const entity = await vehicleManager.get(id)

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertVehicle(vehicleInsert: IVehicleInsert): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            const vehicleManager = new VehicleManager()
            const entity = await vehicleManager.insert(vehicleInsert)

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateVehicle(vehicleUpdate: IVehicleUpdate): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()
        const transaction = await this.transactionManager.beginTransaction()

        try {
            if (!vehicleUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(VehicleErrorCodes.VehicleErrorIdNotProvided))
            }

            const vehicleManager = new VehicleManager(transaction)
            const entity = await vehicleManager.update(vehicleUpdate)
            await transaction.completeTransaction()

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            transaction.cancellTransaction()
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteVehicle(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            const vehicleManager = new VehicleManager()
            await vehicleManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default VehicleAppService
