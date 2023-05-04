import {
    createMap,
    forMember,
    mapFrom
} from "@automapper/core"

import { mapper } from "./mapper"
import Driver from "../../modules/domain/driver/driver.entity"
import DriverDto from "../../modules/contracts/driver/driver.dto"

import { TypeMime } from "../../modules/shared/shared.consts"
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
}

export default runMappers
