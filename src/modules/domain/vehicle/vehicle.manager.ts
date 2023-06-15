import { ObjectId } from "mongodb"

import ServiceException from "../../shared/service.exception"
import TransactionSession from "../../../core/database/transactionSession"
import ServiceError from "../../shared/service.error"

import Vehicle from "./vehicle.entity"
import VehicleRepository from "./vehicle.repository"
import VehicleErrorCodes from "../../shared.domain/vehicle/vehicle.error.codes"
import IVehicleInsert from "../../contracts/vehicle/vehicle.insert"

import {
    SharedConsts,
    TypeMime
} from "../../shared/shared.consts"
import { IVehicleUpdate } from "../../contracts/vehicle/vehicle.update"

class VehicleManager {
    private vehicleRepository: VehicleRepository

    constructor(transaction?: TransactionSession) {
        this.vehicleRepository = new VehicleRepository(transaction)
    }

    async get(id: ObjectId): Promise<Vehicle> {
        const entity = await this.foundEntity(id)
        return entity
    }

    async getVehiclesByDriver(driverId: ObjectId): Promise<Vehicle[]> {
        const vehicles = await this.vehicleRepository.getVehiclesByDriver(driverId)
        return vehicles
    }

    async insert(vehicleInsert: IVehicleInsert): Promise<Vehicle> {
        const vehicle = new Vehicle()
        vehicle.brand = vehicleInsert.brand
        vehicle.model = vehicleInsert.model
        vehicle.plate = vehicleInsert.plate
        vehicle.color = vehicleInsert.color
        vehicle.year = vehicleInsert.year
        vehicle.licencePlatePhoto = Buffer.from(vehicleInsert.licencePlatePhoto, TypeMime.base64)
        vehicle.isVerified = false
        vehicle.driverId = vehicleInsert.driverId

        const entity = await this.vehicleRepository.insert(vehicle)
        return entity
    }

    async update(vehicleUpdate: IVehicleUpdate): Promise<Vehicle> {
        const entity = await this.foundEntity(vehicleUpdate.id)

        const vehicle = new Vehicle()
        vehicle._id = vehicleUpdate.id
        vehicle.brand = vehicleUpdate.brand
        vehicle.model = vehicleUpdate.model
        vehicle.plate = vehicleUpdate.plate
        vehicle.color = vehicleUpdate.color
        vehicle.year = vehicleUpdate.year
        vehicle.licencePlatePhoto = Buffer.from(vehicleUpdate.licencePlatePhoto, TypeMime.base64)
        vehicle.isVerified = entity.isVerified

        const entityUpdated = await this.vehicleRepository.update(vehicle)
        return entityUpdated
    }

    async delete(id: ObjectId): Promise<void> {
        await this.foundEntity(id)
        await this.vehicleRepository.delete(id)
    }

    private foundEntity = async(id: ObjectId): Promise<Vehicle> => {
        const vehicle = await this.vehicleRepository.get(id)
        if (!vehicle) {
            const errorParams = {
                [SharedConsts.id]: id
            }
            const error = ServiceError.getErrorByCode(VehicleErrorCodes.EntityNotFound, errorParams)
            throw new ServiceException(error)
        }

        return vehicle
    }
}

export default VehicleManager
