import express from "express"
import { Request, Response } from "express"
import { mongo } from "mongoose"

import DriverAppService from "../application/driver.application"
import DriverInsert from "../shared/domain/driver.insert"
import DriverUpdate from "../shared/domain/driver.update"

const driverApi = express.Router()
const driverAppService = new DriverAppService()

driverApi.get("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.getDriver(new mongo.ObjectId(req.params.id))
    res.send(result)
})

driverApi.post("/", async (req: Request, res: Response) => {
    const result = await driverAppService.insertDriver(req.body as DriverInsert)
    res.send(result)
})

driverApi.put("/", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriver(req.body as DriverUpdate)
    res.send(result)
})

driverApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.deleteDriver(new mongo.ObjectId(req.params.id))
    res.send(result)
})

export default driverApi
