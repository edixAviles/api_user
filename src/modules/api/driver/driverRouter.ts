import express from "express"
import { Request, Response } from "express"

import DriverAppService from "../../application/driver/driver.appService"
import DriverInput from "../../domain.shared/driver/driver.input"

import validateRequest from "../../../core/middleware/validateRequest"
import driverValidationSchema from "../../domain.validation/driver/driver.validation"

const driverRouter = express.Router()
const driverAppService = new DriverAppService()

driverRouter.post("/", validateRequest(driverValidationSchema), (req: Request, res: Response) => {
    const dto = driverAppService.registerDriver(req.body as DriverInput)
    res.status(200).send(dto)
})

export default driverRouter
