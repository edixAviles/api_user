import { ObjectId } from "mongodb"

interface IVehicleInsert {
  brand: string
  model: string
  plate: string
  color: string
  year: number
  licencePlatePhoto: string
  driverId: ObjectId
}

export default IVehicleInsert
