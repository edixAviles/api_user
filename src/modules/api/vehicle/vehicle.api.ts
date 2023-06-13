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
    const result = await vehicleAppService.getVehicle(new mongo.ObjectId(req.params.id))
    res.send(result)
})

vehicleApi.get("/:id/by-driver", async (req: Request, res: Response) => {
    const result = await vehicleAppService.getVehiclesByDriver(new mongo.ObjectId(req.params.id))
    res.send(result)
})

vehicleApi.post("/", async (req: Request, res: Response) => {
    const result = await vehicleAppService.insertVehicle(req.body as IVehicleInsert)
    res.send(result)
})

vehicleApi.patch("/", async (req: Request, res: Response) => {
    const result = await vehicleAppService.updateVehicle(req.body as IVehicleUpdate)
    res.send(result)
})

vehicleApi.delete("/:id", async (req: Request, res: Response) => {
    const result = await vehicleAppService.deleteVehicle(new mongo.ObjectId(req.params.id))
    res.send(result)
})

export default vehicleApi
