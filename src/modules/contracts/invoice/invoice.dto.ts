import { AutoMap } from "@automapper/classes"
import { ObjectId } from "mongodb"

import { DataTaxDetails } from "../../shared.domain/invoice/invoice.extra"

class InvoiceDto {
  @AutoMap()
  public departure: string

  @AutoMap()
  public arrival: string

  @AutoMap()
  public paymentMethod: string

  @AutoMap()
  public numberOfSeats: number

  @AutoMap()
  public unitPriceOfTrip: number

  @AutoMap()
  public netPriceOfTrip: number

  @AutoMap()
  public unitPriceOfService: number

  @AutoMap()
  public netPriceOfService: number

  @AutoMap()
  public netPrice: number

  @AutoMap()
  public discount: number

  @AutoMap()
  public subtotal: number

  @AutoMap()
  public taxes: number

  @AutoMap()
  public total: number

  @AutoMap(() => [DataTaxDetails])
  public taxDetails: DataTaxDetails[]

  @AutoMap()
  public isPaid: boolean

  @AutoMap()
  public tripUserId: ObjectId
}

export { InvoiceDto }
