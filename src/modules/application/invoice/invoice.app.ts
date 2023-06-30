import { ObjectId } from "mongodb"

import ApplicationService from "../../../core/application/applicationService"
import Response from "../../../core/response/response"
import ResponseManager from "../../../core/response/response.manager"
import ServiceError from "../../shared/service.error"
import Invoice from "../../domain/invoice/invoice.entity"
import InvoiceManager from "../../domain/invoice/invoice.manager"

import { mapper } from "../../../core/mappings/mapper"
import {
    InvoiceDto
} from "../../contracts/invoice/invoice.dto"

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

    async getInvoiceByTripUser(userId: ObjectId): Promise<Response<InvoiceDto>> {
        const response = new ResponseManager<InvoiceDto>()

        try {
            const entity = await this.invoiceManager.getInvoiceByTripUser(userId)

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
