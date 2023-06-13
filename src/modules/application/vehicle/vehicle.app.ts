import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import Vehicle from "../../domain/vehicle/vehicle.entity"
import VehicleManager from "../../domain/vehicle/vehicle.manager"
import DriverManager from "../../domain/driver/driver.manager"
import IVehicleInsert from "../../contracts/vehicle/vehicle.insert"
import VehicleErrorCodes from "../../shared.domain/vehicle/vehicle.error.codes"
import DriverErrorCodes from "../../shared.domain/driver/driver.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import { VehicleDto } from "../../contracts/vehicle/vehicle.dto"
import {
    IVehicleUpdate
} from "../../contracts/vehicle/vehicle.update"

class VehicleAppService extends ApplicationService {
    private vehicleManager: VehicleManager
    private driverManager: DriverManager

    constructor() {
        super()
        this.vehicleManager = new VehicleManager()
        this.driverManager = new DriverManager()
    }

    async getVehicle(id: ObjectId): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            const entity = await this.vehicleManager.get(id)

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertVehicle(vehicleInsert: IVehicleInsert): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            const driver = await this.driverManager.get(vehicleInsert.driverId)
            if (!driver) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.EntityNotFound))
            }

            const entity = await this.vehicleManager.insert(vehicleInsert)

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async updateVehicle(vehicleUpdate: IVehicleUpdate): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            if (!vehicleUpdate.id) {
                throw new ServiceException(ServiceError.getErrorByCode(VehicleErrorCodes.IdNotProvided))
            }

            const driver = await this.driverManager.get(vehicleUpdate.driverId)
            if (!driver) {
                throw new ServiceException(ServiceError.getErrorByCode(DriverErrorCodes.EntityNotFound))
            }

            const entity = await this.vehicleManager.update(vehicleUpdate)

            const dto = mapper.map(entity, Vehicle, VehicleDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async deleteVehicle(id: ObjectId): Promise<Response<ObjectId>> {
        const response = new ResponseManager<ObjectId>()

        try {
            await this.vehicleManager.delete(id)

            return response.onSuccess(id)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }
}

export default VehicleAppService
