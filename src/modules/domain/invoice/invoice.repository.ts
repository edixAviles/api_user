import { ObjectId } from "mongodb"

import Invoice from "./invoice.entity"
import InvoiceModel from "./invoice.model"
import {
    Repository,
    IRepository
} from "../../../core/domain/repository"

class InvoiceRepository extends Repository<Invoice> implements IRepository<Invoice> {
    async get(id: ObjectId): Promise<Invoice> {
        const document = await InvoiceModel.findOne(Repository.filterToGetById(id))

        const entity = new Invoice({ ...document })
        return document ? entity : null
    }

    async getInvoiceByTripUser(tripUserId: ObjectId): Promise<Invoice> {
        const filter = {
            ...Repository.filterToGetActive(),
            tripUserId
        }
        const document = await InvoiceModel.findOne(filter)

        const entity = new Invoice({ ...document })
        return document ? entity : null
    }

    async insert(entity: Invoice): Promise<Invoice> {
        const document = new InvoiceModel({ ...entity })
        await document.save(this.optionsToInsert())

        const createdEntity = new Invoice({ ...document })
        return createdEntity
    }

    async update(entity: Invoice): Promise<Invoice> {
        const dataToUpdate = this.mapObjectToUpdate(entity)
        const document = await InvoiceModel.findOneAndUpdate(
            { _id: entity._id },
            dataToUpdate,
            this.optionsToUpdate()
        )

        const updatedEntity = new Invoice({ ...document })
        return updatedEntity
    }

    async delete(id: ObjectId): Promise<void> {
        await InvoiceModel.findOneAndUpdate(
            { _id: id },
            Repository.paramsToDelete(),
            this.optionsToUpdate()
        )
    }
}

export default InvoiceRepository
