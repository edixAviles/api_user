import express from "express"
import { mongo } from "mongoose"
import {
    Request,
    Response
} from "express"

import DriverAppService from "../../application/driver/driver.app"
import IDriverInsert from "../../contracts/driver/driver.insert"
import {
    IDriverUpdate,
    IDriverUpdateProfilePhoto,
    IDriverUpdateLicencePhoto,
    IDriverUpdatePoliceRecord,
    IDriverUpdatePassword
} from "../../contracts/driver/driver.update"

const driverApi = express.Router()
const driverAppService = new DriverAppService()

driverApi.get("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await driverAppService.getDriver(id)
    res.send(result)
})

driverApi.post("/", async (req: Request, res: Response) => {
    const driverInsert = req.body as IDriverInsert
    const result = await driverAppService.insertDriver(driverInsert)
    res.send(result)
})

driverApi.patch("/", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IDriverUpdate
    const result = await driverAppService.updateDriver(driverUpdate)
    res.send(result)
})

driverApi.patch("/set-profile-photo", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IDriverUpdateProfilePhoto
    const result = await driverAppService.updateDriverProfilePhoto(driverUpdate)
    res.send(result)
})

driverApi.patch("/set-licence-photo", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IDriverUpdateLicencePhoto
    const result = await driverAppService.updateDriverLicencePhoto(driverUpdate)
    res.send(result)
})

driverApi.patch("/set-police-record", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IDriverUpdatePoliceRecord
    const result = await driverAppService.updateDriverPoliceRecord(driverUpdate)
    res.send(result)
})

driverApi.patch("/set-password", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IDriverUpdatePassword
    const result = await driverAppService.updateDriverPassword(driverUpdate)
    res.send(result)
})

driverApi.delete("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await driverAppService.deleteDriver(id)
    res.send(result)
})

export default driverApi
