import express from "express"
import { mongo } from "mongoose"
import { Request, Response } from "express"

import RatingAppService from "../../application/rating/rating.app"
import IRatingInsert from "../../contracts/rating/rating.insert"

const ratingApi = express.Router()
const ratingAppService = new RatingAppService()

ratingApi.get("/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await ratingAppService.getRating(id)
  res.send(result)
})

ratingApi.get("/:id/by-user", async (req: Request, res: Response) => {
  const userId = new mongo.ObjectId(req.params.id)
  const result = await ratingAppService.getRatingsByUser(userId)
  res.send(result)
})

ratingApi.post("/", async (req: Request, res: Response) => {
  const ratingInsert = req.body as IRatingInsert
  const result = await ratingAppService.insertRating(ratingInsert)
  res.send(result)
})

ratingApi.delete("/:id", async (req: Request, res: Response) => {
  const id = new mongo.ObjectId(req.params.id)
  const result = await ratingAppService.deleteRating(id)
  res.send(result)
})

export default ratingApi
