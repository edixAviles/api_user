import express, { Request, Response } from "express"
import { mongo } from "mongoose"

import ITripInsert from "../../contracts/trip/trip.insert"
import TripAppService from "../../application/trip/trip.app"
import { ITripCancel } from "../../contracts/trip/trip.update"
import { TripState } from "../../shared.domain/trip/trip.extra"

const tripApi = express.Router()
const tripAppService = new TripAppService()

tripApi.get("/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripAppService.getTrip(id)
  res.send(result)
})

tripApi.get(
  "/:state/state/:id/by-driver",
  async (req: Request, res: Response) => {
    const driverId = new mongo.ObjectId(req.params.id)
    const state = req.params.state as TripState
    const result = await tripAppService.getTripsByDriver(driverId, state)
    res.send(result)
  },
)

tripApi.get(
  "/search/:departure/:arrival/:seats",
  async (req: Request, res: Response) => {
    const departure = req.params.departure
    const arrival = req.params.arrival
    const requestedSeats = parseInt(req.params.seats)
    const result = await tripAppService.searchTrips(
      departure,
      arrival,
      requestedSeats,
    )
    res.send(result)
  },
)

tripApi.post("/publish", async (req: Request, res: Response) => {
  const tripInsert = req.body as ITripInsert
  const result = await tripAppService.publishTrip(tripInsert)
  res.send(result)
})

tripApi.post("/pick-up-passengers/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripAppService.pickUpPassengers(id)
  res.send(result)
})

tripApi.post("/start-trip/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripAppService.startTrip(id)
  res.send(result)
})

tripApi.post("/finish/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await tripAppService.finishTrip(id)
  res.send(result)
})

tripApi.post("/cancel", async (req: Request, res: Response) => {
  const tripCancel = req.body as ITripCancel
  const result = await tripAppService.cancelTrip(tripCancel)
  res.send(result)
})

export default tripApi
