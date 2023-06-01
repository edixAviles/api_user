import express from "express"
import {
    Request,
    Response
} from "express"

import statusCodes from "../../../core/api/statusCodes"
import driverApi from "../../../modules/api/driver/driver.api"
import vehicleApi from "../../../modules/api/vehicle/vehicle.api"
import userApi from "../../../modules/api/user/user.api"
import tripApi from "../../../modules/api/trip/trip.api"

const v1Router = express.Router()
const { NOT_FOUND } = statusCodes

v1Router.use("/driver", driverApi)
v1Router.use("/vehicle", vehicleApi)
v1Router.use("/user", userApi)
v1Router.use("/trip", tripApi)

v1Router.all("*", (req: Request, res: Response) => {
    res.sendStatus(NOT_FOUND)
})

export default v1Router
