import {
    createMap,
    forMember,
    mapFrom
} from "@automapper/core"

import Driver from "../../modules/domain/driver/driver.entity"
import Vehicle from "../../modules/domain/vehicle/vehicle.entity"

import { mapper } from "./mapper"
import { TypeMime } from "../../modules/shared/shared.consts"

import { DriverDto } from "../../modules/contracts/driver/driver.dto"
import { VehicleDto } from "../../modules/contracts/vehicle/vehicle.dto"
import {
    DataBufferApproved,
    DataBufferApprovedDto
} from "../../modules/shared/extraProperties/approved"

const runMappers = () => {
    createMap(
        mapper,
        DataBufferApproved,
        DataBufferApprovedDto,
        forMember(member => member.data, mapFrom(s => s.data.toString(TypeMime.base64)))
    )

    createMap(mapper, Driver, DriverDto)
    createMap(mapper,
        Vehicle,
        VehicleDto,
        forMember(member => member.licencePlatePhoto, mapFrom(s => s.licencePlatePhoto.toString(TypeMime.base64)))
    )
}

export default runMappers
