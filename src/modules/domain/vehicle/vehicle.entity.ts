import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import BaseModel from "api_utility/src/domain/base_model"

class Vehicle extends BaseModel {
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
  public licencePlatePhoto: Buffer

  @AutoMap()
  public isVerified: boolean

  @AutoMap()
  public driverId: ObjectId
}

export default Vehicle
