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
    IUserUpdatePassword
} from "../../contracts/user/user.update"

const userApi = express.Router()
const userAppService = new UserAppService()

userApi.get("/:id", async (req: Request, res: Response) => {
    const result = await userAppService.getUser(new mongo.ObjectId(req.params.id))
    res.send(result)
})

userApi.post("/", async (req: Request, res: Response) => {
    const result = await userAppService.insertUser(req.body as IUserInsert)
    res.send(result)
})

userApi.patch("/", async (req: Request, res: Response) => {
    const result = await userAppService.updateUser(req.body as IUserUpdate)
    res.send(result)
})

userApi.patch("/set-profile-photo", async (req: Request, res: Response) => {
    const result = await userAppService.updateUserProfilePhoto(req.body as IUserUpdateProfilePhoto)
    res.send(result)
})

userApi.patch("/set-password", async (req: Request, res: Response) => {
    const result = await userAppService.updateUserPassword(req.body as IUserUpdatePassword)
    res.send(result)
})

userApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await userAppService.deleteUser(new mongo.ObjectId(req.params.id))
    res.send(result)
})

export default userApi
