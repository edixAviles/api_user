import {
    createMap,
    forMember,
    mapFrom
} from "@automapper/core"

import { mapper } from "./mapper"
import Driver from "../../modules/driver/domain/driver.entity"
import DriverDto from "../../modules/driver/shared/domain/driver.dto"

import { TypeMime } from "../../modules/driver/shared/shared.consts"
import {
    DataBufferApproved,
    DataBufferApprovedDto
} from "../../modules/driver/shared/extraProperties/approved"

const runMappers = () => {
    createMap(
        mapper,
        DataBufferApproved,
        DataBufferApprovedDto,
        forMember(member => member.data, mapFrom(s => s.data.toString(TypeMime.base64)))
    )

    createMap(mapper, Driver, DriverDto)
}

export default runMappers
