import express from "express"
import { mongo } from "mongoose"
import {
    Request,
    Response
} from "express"

import UserAppService from "../../application/user/user.app"
import IUserInsert from "../../contracts/user/user.insert"
import {
    IUserUpdate,
    IUserUpdateProfilePhoto,
    IUserUpdateLicencePhoto,
    IUserUpdatePoliceRecord,
    IUserUpdatePassword
} from "../../contracts/user/user.update"

const userApi = express.Router()
const userAppService = new UserAppService()

userApi.get("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await userAppService.getDriver(id)
    res.send(result)
})

userApi.post("/", async (req: Request, res: Response) => {
    const driverInsert = req.body as IUserInsert
    const result = await userAppService.insertDriver(driverInsert)
    res.send(result)
})

userApi.patch("/", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IUserUpdate
    const result = await userAppService.updateDriver(driverUpdate)
    res.send(result)
})

userApi.patch("/set-profile-photo", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IUserUpdateProfilePhoto
    const result = await userAppService.updateDriverProfilePhoto(driverUpdate)
    res.send(result)
})

userApi.patch("/set-licence-photo", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IUserUpdateLicencePhoto
    const result = await userAppService.updateDriverLicencePhoto(driverUpdate)
    res.send(result)
})

userApi.patch("/set-police-record", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IUserUpdatePoliceRecord
    const result = await userAppService.updateDriverPoliceRecord(driverUpdate)
    res.send(result)
})

userApi.patch("/set-password", async (req: Request, res: Response) => {
    const driverUpdate = req.body as IUserUpdatePassword
    const result = await userAppService.updateDriverPassword(driverUpdate)
    res.send(result)
})

userApi.delete("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await userAppService.deleteDriver(id)
    res.send(result)
})

export default userApi
