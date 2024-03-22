import { ObjectId } from "mongodb"
import ApplicationService from "api_utility/src/application/application_service"
import Response from "api_utility/src/response/response"
import ResponseManager from "api_utility/src/response/response_manager"
import ServiceError from "api_utility/src/error/service_error"

import Invoice from "../../domain/invoice/invoice.entity"
import InvoiceManager from "../../domain/invoice/invoice.manager"

import { mapper } from "../../../core/mappings/mapper"
import { InvoiceDto } from "../../contracts/invoice/invoice.dto"

class InvoiceAppService extends ApplicationService {
  private invoiceManager: InvoiceManager

  constructor() {
    super()
    this.invoiceManager = new InvoiceManager()
  }

  async getInvoice(id: ObjectId): Promise<Response<InvoiceDto>> {
    const response = new ResponseManager<InvoiceDto>()

    try {
      const entity = await this.invoiceManager.get(id)

      const dto = mapper.map(entity, Invoice, InvoiceDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async getInvoiceByTripUser(
    tripUserId: ObjectId,
  ): Promise<Response<InvoiceDto>> {
    const response = new ResponseManager<InvoiceDto>()

    try {
      const entity = await this.invoiceManager.getInvoiceByTripUser(tripUserId)

      const dto = mapper.map(entity, Invoice, InvoiceDto)
      return response.onSuccess(dto)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }

  async cancelInvoice(id: ObjectId): Promise<Response<ObjectId>> {
    const response = new ResponseManager<ObjectId>()

    try {
      await this.invoiceManager.delete(id)

      return response.onSuccess(id)
    } catch (error) {
      return response.onError(ServiceError.getException(error))
    }
  }
}

export default InvoiceAppService
