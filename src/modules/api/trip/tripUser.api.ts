import express, { Request, Response } from "express"
import { mongo } from "mongoose"

import ITripUserInsert from "../../contracts/trip/tripUser.insert"
import { ITripUserCancel } from "../../contracts/trip/tripUser.update"
import TripUserAppService from "../../application/trip/tripUser.app"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"

const tripUserApi = express.Router()
const tripUserAppService = new TripUserAppService()

tripUserApi.get("/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripUserAppService.getTripUser(id)
  res.send(result)
})

tripUserApi.get(
  "/:state/state/:id/by-user",
  async (req: Request, res: Response) => {
    const userId = new mongo.ObjectId(req.params.id)
    const state = req.params.state as TripUserState
    const result = await tripUserAppService.getTripsUserByUser(userId, state)
    res.send(result)
  },
)

tripUserApi.post("/book", async (req: Request, res: Response) => {
  const tripInsert = req.body as ITripUserInsert
  const result = await tripUserAppService.bookTripUser(tripInsert)
  res.send(result)
})

tripUserApi.post(
  "/pick-up-passenger/:id",
  async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await tripUserAppService.pickUpPassenger(id)
    res.send(result)
  },
)

tripUserApi.post("/start-trip/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripUserAppService.startTripUser(id)
  res.send(result)
})

tripUserApi.post("/cancel", async (req: Request, res: Response) => {
  const tripCancel = req.body as ITripUserCancel
  const result = await tripUserAppService.cancelTripUser(tripCancel)
  res.send(result)
})

export default tripUserApi
