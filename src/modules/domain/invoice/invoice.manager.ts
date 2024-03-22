import { ObjectId } from "mongodb"
import ServiceException from "api_utility/src/exception/service_exception"
import TransactionSession from "api_utility/src/database/transaction_session"
import EntityFields from "api_utility/src/domain/entity_fields"

import LocalizeError from "../../shared/localize_error"
import Invoice from "./invoice.entity"
import InvoiceRepository from "./invoice.repository"
import IInvoiceInsert from "../../contracts/invoice/invoice.insert"
import InvoiceErrorCodes from "../../shared.domain/invoice/invoice.error.codes"

class InvoiceManager {
  private invoiceRepository: InvoiceRepository

  constructor(transaction?: TransactionSession) {
    this.invoiceRepository = new InvoiceRepository(transaction)
  }

  async get(id: ObjectId): Promise<Invoice> {
    const entity = await this.foundEntity(id)
    return entity
  }

  async getInvoiceByTripUser(tripUserId: ObjectId): Promise<Invoice | null> {
    const invoice =
      await this.invoiceRepository.getInvoiceByTripUser(tripUserId)
    return invoice
  }

  async insert(invoiceInsert: IInvoiceInsert): Promise<Invoice> {
    const invoice = new Invoice()
    invoice.departure = invoiceInsert.departure
    invoice.arrival = invoiceInsert.arrival
    invoice.paymentMethod = invoiceInsert.paymentMethod

    invoice.numberOfSeats = invoiceInsert.numberOfSeats
    invoice.unitPriceOfTrip = invoiceInsert.unitPriceOfTrip
    invoice.netPriceOfTrip = invoiceInsert.netPriceOfTrip
    invoice.unitPriceOfService = invoiceInsert.unitPriceOfService
    invoice.netPriceOfService = invoiceInsert.netPriceOfService
    invoice.netPrice = invoiceInsert.netPrice
    invoice.discount = invoiceInsert.discount
    invoice.subtotal = invoiceInsert.subtotal
    invoice.taxes = invoiceInsert.taxes
    invoice.total = invoiceInsert.total

    invoice.taxDetails = invoiceInsert.taxDetails
    invoice.isPaid = invoiceInsert.isPaid
    invoice.tripUserId = invoiceInsert.tripUserId

    const entity = await this.invoiceRepository.insert(invoice)
    return entity
  }

  async delete(id: ObjectId): Promise<void> {
    await this.foundEntity(id)
    await this.invoiceRepository.delete(id)
  }

  private foundEntity = async (id: ObjectId): Promise<Invoice> => {
    const invoice = await this.invoiceRepository.get(id)
    if (!invoice) {
      const errorParams = new Map<string, string>([
        [EntityFields.id, id.toString()],
      ])
      const error = LocalizeError.getErrorByCode(
        InvoiceErrorCodes.EntityNotFound,
        errorParams,
      )
      throw new ServiceException(error)
    }

    return invoice
  }
}

export default InvoiceManager
