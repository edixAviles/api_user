import express from "express"
import { Request, Response } from "express"

import DriverAppService from "../application/driver.application"
import DriverInsert from "../shared/driver.insert"
import DriverUpdate from "../shared/driver.update"
import { mongo } from "mongoose"

const driverApi = express.Router()
const driverAppService = new DriverAppService()

driverApi.get("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.getDriver(new mongo.ObjectId(req.params.id))
    res.status(result.statusCode).send(result)
})

driverApi.post("/", async (req: Request, res: Response) => {
    const result = await driverAppService.insertDriver(req.body as DriverInsert)
    res.status(result.statusCode).send(result)
})

driverApi.put("/", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriver(req.body as DriverUpdate)
    res.status(result.statusCode).send(result)
})

driverApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.deleteDriver(new mongo.ObjectId(req.params.id))
    res.status(result.statusCode).send(result)
})

export default driverApi
