import express from "express"
import {
    Request,
    Response
} from "express"

import driverApi from "../../../modules/driver/api/driver.api"
import statusCodes from "../../../core/api/statusCodes"

const v1Router = express.Router()
const { NOT_FOUND } = statusCodes

v1Router.use("/driver", driverApi)
// All routes go here

v1Router.all('*', (req: Request, res: Response) => {
    res.sendStatus(NOT_FOUND)
})

export default v1Router
