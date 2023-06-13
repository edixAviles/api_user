import express, { Request, Response } from "express"
import { mongo } from "mongoose"
import ITripInsert from "../../contracts/trip/trip.insert"
import TripAppService from "../../application/trip/trip.app"
import { ITripCancel } from "../../contracts/trip/trip.update"

const tripApi = express.Router()
const tripAppService = new TripAppService()

tripApi.get("/:id", async (req: Request, res: Response) => {
    const result = await tripAppService.getTrip(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripApi.post("/publish", async (req: Request, res: Response) => {
    const result = await tripAppService.publishTrip(req.body as ITripInsert)
    res.send(result)
})

tripApi.post("/pick-up-passengers/:id", async (req: Request, res: Response) => {
    const result = await tripAppService.pickUpPassengers(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripApi.post("/finish/:id", async (req: Request, res: Response) => {
    const result = await tripAppService.finishTrip(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripApi.post("/cancel", async (req: Request, res: Response) => {
    const result = await tripAppService.cancelTrip(req.body as ITripCancel)
    res.send(result)
})

export default tripApi
