import express from "express"
import { Request, Response } from "express"

import DriverAppService from "../application/driver.application"
import DriverInput from "../shared/driver.input"

//import validateRequest from "../../../core/middleware/validateRequest"

const driverApi = express.Router()
const driverAppService = new DriverAppService()

driverApi.post("/", async (req: Request, res: Response) => {
    const dto = await driverAppService.registerDriver(req.body as DriverInput)
    res.status(200).send(dto)
})

export default driverApi
