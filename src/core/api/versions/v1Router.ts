import express from "express"
import { Request, Response } from "express"
import HttpStatusCode from "api_utility/src/consts/http_status_code"

import userApi from "../../../modules/api/user/user.api"
import vehicleApi from "../../../modules/api/vehicle/vehicle.api"
import tripApi from "../../../modules/api/trip/trip.api"
import tripUserApi from "../../../modules/api/trip/tripUser.api"
import ratingApi from "../../../modules/api/rating/rating.api"

const v1Router = express.Router()
const { NOT_FOUND } = HttpStatusCode

v1Router.use("/user", userApi)
v1Router.use("/vehicle", vehicleApi)
v1Router.use("/trip", tripApi)
v1Router.use("/trip-user", tripUserApi)
v1Router.use("/rating", ratingApi)

v1Router.all("*", (req: Request, res: Response) => {
  res.sendStatus(NOT_FOUND)
})

export default v1Router
