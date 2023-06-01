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
    const result = await driverAppService.getDriver(new mongo.ObjectId(req.params.id))
    res.send(result)
})

driverApi.post("/", async (req: Request, res: Response) => {
    const result = await driverAppService.insertDriver(req.body as IDriverInsert)
    res.send(result)
})

driverApi.patch("/", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriver(req.body as IDriverUpdate)
    res.send(result)
})

driverApi.patch("/set-profile-photo", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriverProfilePhoto(req.body as IDriverUpdateProfilePhoto)
    res.send(result)
})

driverApi.patch("/set-licence-photo", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriverLicencePhoto(req.body as IDriverUpdateLicencePhoto)
    res.send(result)
})

driverApi.patch("/set-police-record", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriverPoliceRecord(req.body as IDriverUpdatePoliceRecord)
    res.send(result)
})

driverApi.patch("/set-password", async (req: Request, res: Response) => {
    const result = await driverAppService.updateDriverPassword(req.body as IDriverUpdatePassword)
    res.send(result)
})

driverApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await driverAppService.deleteDriver(new mongo.ObjectId(req.params.id))
    res.send(result)
})

export default driverApi
