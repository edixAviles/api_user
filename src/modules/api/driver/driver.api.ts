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
    const result = await userAppService.getUser(id)
    res.send(result)
})

userApi.post("/", async (req: Request, res: Response) => {
    const userInsert = req.body as IUserInsert
    const result = await userAppService.insertUser(userInsert)
    res.send(result)
})

userApi.patch("/", async (req: Request, res: Response) => {
    const userUpdate = req.body as IUserUpdate
    const result = await userAppService.updateUser(userUpdate)
    res.send(result)
})

userApi.patch("/set-profile-photo", async (req: Request, res: Response) => {
    const userUpdate = req.body as IUserUpdateProfilePhoto
    const result = await userAppService.updateUserProfilePhoto(userUpdate)
    res.send(result)
})

userApi.patch("/set-licence-photo", async (req: Request, res: Response) => {
    const userUpdate = req.body as IUserUpdateLicencePhoto
    const result = await userAppService.updateUserLicencePhoto(userUpdate)
    res.send(result)
})

userApi.patch("/set-police-record", async (req: Request, res: Response) => {
    const userUpdate = req.body as IUserUpdatePoliceRecord
    const result = await userAppService.updateUserPoliceRecord(userUpdate)
    res.send(result)
})

userApi.patch("/set-password", async (req: Request, res: Response) => {
    const userUpdate = req.body as IUserUpdatePassword
    const result = await userAppService.updateUserPassword(userUpdate)
    res.send(result)
})

userApi.delete("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await userAppService.deleteUser(id)
    res.send(result)
})

export default userApi
