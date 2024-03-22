import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

class VehicleDto {
  @AutoMap()
  public _id: ObjectId

  @AutoMap()
  public brand: string

  @AutoMap()
  public model: string

  @AutoMap()
  public plate: string

  @AutoMap()
  public color: string

  @AutoMap()
  public year: number

  @AutoMap()
  public licencePlatePhoto: String

  @AutoMap()
  public isVerified: boolean

  @AutoMap()
  public driverId: ObjectId
}

class VehicleLiteDto {
  @AutoMap()
  public brand: string

  @AutoMap()
  public model: string

  @AutoMap()
  public plate: string

  @AutoMap()
  public color: string

  @AutoMap()
  public year: number

  @AutoMap()
  public isVerified: boolean

  @AutoMap()
  public driverId: ObjectId
}

export { VehicleDto, VehicleLiteDto }
