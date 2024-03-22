import { ObjectId } from "mongodb"
import { DataTaxDetails } from "../../shared.domain/invoice/invoice.extra"

interface IInvoiceInsert {
  departure: string
  arrival: string
  paymentMethod: string

  numberOfSeats: number
  unitPriceOfTrip: number
  netPriceOfTrip: number
  unitPriceOfService: number
  netPriceOfService: number
  netPrice: number
  discount: number
  subtotal: number
  taxes: number
  total: number

  taxDetails: DataTaxDetails[]
  isPaid: boolean
  tripUserId: ObjectId
}

export default IInvoiceInsert
