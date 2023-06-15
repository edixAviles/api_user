import { ObjectId } from "mongodb"

interface IVehicleUpdate {
    id: ObjectId
    brand: string
    model: string
    plate: string
    color: string
    year: number
    licencePlatePhoto: string
}

export {
    IVehicleUpdate
}
