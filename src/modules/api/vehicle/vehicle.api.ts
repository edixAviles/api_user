import express from "express"
import { mongo } from "mongoose"
import {
    Request,
    Response
} from "express"


import VehicleAppService from "../../application/vehicle/vehicle.app"
import IVehicleInsert from "../../contracts/vehicle/vehicle.insert"
import {
    IVehicleUpdate
} from "../../contracts/vehicle/vehicle.update"

const vehicleApi = express.Router()
const vehicleAppService = new VehicleAppService()

vehicleApi.get("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await vehicleAppService.getVehicle(id)
    res.send(result)
})

vehicleApi.get("/:id/by-user", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await vehicleAppService.getVehiclesByDriver(id)
    res.send(result)
})

vehicleApi.post("/", async (req: Request, res: Response) => {
    const vehicleInsert = req.body as IVehicleInsert
    const result = await vehicleAppService.insertVehicle(vehicleInsert)
    res.send(result)
})

vehicleApi.patch("/", async (req: Request, res: Response) => {
    const vehicleUpdate = req.body as IVehicleUpdate
    const result = await vehicleAppService.updateVehicle(vehicleUpdate)
    res.send(result)
})

vehicleApi.delete("/:id", async (req: Request, res: Response) => {
    const id = new mongo.ObjectId(req.params.id)
    const result = await vehicleAppService.deleteVehicle(id)
    res.send(result)
})

export default vehicleApi
