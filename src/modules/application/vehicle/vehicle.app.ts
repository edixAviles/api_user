import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import LocalizeError from "../../shared/localize_error"
import Vehicle from "../../domain/vehicle/vehicle.entity"
import VehicleManager from "../../domain/vehicle/vehicle.manager"
import UserManager from "../../domain/user/user.manager"
import IVehicleInsert from "../../contracts/vehicle/vehicle.insert"
import UserErrorCodes from "../../shared.domain/user/user.error.codes"

import { mapper } from "../../../core/mappings/mapper"
import {
    VehicleDto,
    VehicleLiteDto
} from "../../contracts/vehicle/vehicle.dto"
import {
    IVehicleUpdate
} from "../../contracts/vehicle/vehicle.update"
import { EntityFields } from "../../shared/shared.consts"

class VehicleAppService extends ApplicationService {
    private vehicleManager: VehicleManager
    private userManager: UserManager

    constructor() {
        super()
        this.vehicleManager = new VehicleManager()
        this.userManager = new UserManager()
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

    async getVehiclesByDriver(driverId: ObjectId): Promise<Response<VehicleLiteDto[]>> {
        const response = new ResponseManager<VehicleLiteDto[]>()

        try {
            const user = await this.userManager.get(driverId)
            if (!user.isDriver) {
                throw new ServiceException(LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver))
            }

            const entities = await this.vehicleManager.getVehiclesByDriver(driverId)

            const dto = mapper.mapArray(entities, Vehicle, VehicleLiteDto)
            return response.onSuccess(dto)
        } catch (error) {
            return response.onError(ServiceError.getException(error))
        }
    }

    async insertVehicle(vehicleInsert: IVehicleInsert): Promise<Response<VehicleDto>> {
        const response = new ResponseManager<VehicleDto>()

        try {
            const user = await this.userManager.get(vehicleInsert.driverId)
            if (!user.isDriver) {
                throw new ServiceException(LocalizeError.getErrorByCode(UserErrorCodes.IsNotDriver))
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
