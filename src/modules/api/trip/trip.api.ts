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

tripApi.post("/", async (req: Request, res: Response) => {
    const result = await tripAppService.insertTrip(req.body as ITripInsert)
    res.send(result)
})

tripApi.patch("/finish", async (req: Request, res: Response) => {
    const result = await tripAppService.finishTrip(new mongo.ObjectId(req.params.id))
    res.send(result)
})

tripApi.patch("/cancel", async (req: Request, res: Response) => {
    const result = await tripAppService.cancelTrip(req.body as ITripCancel)
    res.send(result)
})

export default tripApi
