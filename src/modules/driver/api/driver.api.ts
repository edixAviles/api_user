import express from "express"
import { Request, Response } from "express"
import { mongo } from "mongoose"

import DriverAppService from "../application/driver.application"
import DriverInsert from "../shared/domain/driver.insert"
import DriverUpdate from "../shared/domain/driver.update"
import statusCodes from "../../../core/api/statusCodes"

const driverApi = express.Router()
const driverAppService = new DriverAppService()
const { OK } = statusCodes

driverApi.get("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.getDriver(new mongo.ObjectId(req.params.id))
    res.status(OK).send(result)
})

driverApi.post("/", async (req: Request, res: Response) => {
    const result = await driverAppService.insertDriver(req.body as DriverInsert)
    res.status(OK).send(result)
})

driverApi.put("/", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriver(req.body as DriverUpdate)
    res.status(OK).send(result)
})

driverApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.deleteDriver(new mongo.ObjectId(req.params.id))
    res.status(OK).send(result)
})

export default driverApi
