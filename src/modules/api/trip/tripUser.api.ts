import express, { Request, Response } from "express"
import { mongo } from "mongoose"
import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import TripUserAppService from "../../application/trip/tripUser.app"

const tripUserApi = express.Router()
const tripUserAppService = new TripUserAppService()

tripUserApi.get("/:id", async (req: Request, res: Response) => {
    const result = await tripUserAppService.getTripUser(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripUserApi.post("/book", async (req: Request, res: Response) => {
    const result = await tripUserAppService.bookTripUser(req.body as ITripUserInsert)
    res.send(result)
})

tripUserApi.post("/pick-up-passenger/:id", async (req: Request, res: Response) => {
    const result = await tripUserAppService.pickUpPassenger(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripUserApi.post("/start-trip/:id", async (req: Request, res: Response) => {
    const result = await tripUserAppService.startTripUser(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripUserApi.post("/cancel", async (req: Request, res: Response) => {
    const result = await tripUserAppService.cancelTripUser(req.body as ITripUserCancel)
    res.send(result)
})

export default tripUserApi
