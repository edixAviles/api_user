import {
    createMap,
    forMember,
    mapFrom
} from "@automapper/core"

import User from "../../modules/domain/user/user.entity"
import Vehicle from "../../modules/domain/vehicle/vehicle.entity"
import Trip from "../../modules/domain/trip/trip.entity"
import TripUser from "../../modules/domain/trip/tripUser.entity"
import Rating from "../../modules/domain/rating/rating.entity"

import { mapper } from "./mapper"
import { TypeMime } from "../../modules/shared/shared.consts"

import {
    UserDto
} from "../../modules/contracts/user/user.dto"
import {
    VehicleDto,
    VehicleLiteDto
} from "../../modules/contracts/vehicle/vehicle.dto"
import {
    TripDto
} from "../../modules/contracts/trip/trip.dto"
import {
    TripUserDto
} from "../../modules/contracts/trip/tripUser.dto"
import {
    DataBufferApproved,
    DataBufferApprovedDto
} from "../../modules/shared.domain/user/user.extra"
import {
    RatingDto
} from "../../modules/contracts/rating/rating.dto"

const runMappers = () => {
    createMap(
        mapper,
        DataBufferApproved,
        DataBufferApprovedDto,
        forMember(member => member.data, mapFrom(s => s.data?.toString(TypeMime.base64))),
        forMember(member => member.isApproved, mapFrom(s => s.isApproved))
    )

    createMap(mapper, User, UserDto)
    createMap(mapper,
        Vehicle,
        VehicleDto,
        forMember(member => member.licencePlatePhoto, mapFrom(s => s.licencePlatePhoto.toString(TypeMime.base64)))
    )
    createMap(mapper, Vehicle, VehicleLiteDto)
    createMap(mapper, Trip, TripDto)
    createMap(mapper, TripUser, TripUserDto)
    createMap(mapper, Rating, RatingDto)
}

export default runMappers
