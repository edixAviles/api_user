import {
    createMap,
    forMember,
    mapFrom
} from "@automapper/core"

import Driver from "../../modules/domain/driver/driver.entity"
import Vehicle from "../../modules/domain/vehicle/vehicle.entity"
import User from "../../modules/domain/user/user.entity"

import { mapper } from "./mapper"
import { TypeMime } from "../../modules/shared/shared.consts"

import { DriverDto } from "../../modules/contracts/driver/driver.dto"
import { VehicleDto } from "../../modules/contracts/vehicle/vehicle.dto"
import { UserDto } from "../../modules/contracts/user/user.dto"
import {
    DataBufferApproved,
    DataBufferApprovedDto
} from "../../modules/shared.domain/driver/driver.exta"
import Trip from "../../modules/domain/trip/trip.entity"
import { TripDto } from "../../modules/contracts/trip/trip.dto"

const runMappers = () => {
    createMap(
        mapper,
        DataBufferApproved,
        DataBufferApprovedDto,
        forMember(member => member.data, mapFrom(s => s.data.toString(TypeMime.base64))),
        forMember(member => member.isApproved, mapFrom(s => s.isApproved))
    )

    createMap(mapper, Driver, DriverDto)
    createMap(mapper,
        Vehicle,
        VehicleDto,
        forMember(member => member.licencePlatePhoto, mapFrom(s => s.licencePlatePhoto.toString(TypeMime.base64)))
    )
    createMap(mapper, User, UserDto)
    createMap(mapper, Trip, TripDto)
}

export default runMappers
