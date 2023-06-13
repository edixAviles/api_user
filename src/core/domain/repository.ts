import { ObjectId } from "mongodb"

import BaseBasicModel from "./base.model"
import TransactionSession from "../database/transactionSession"

abstract class Repository<T extends BaseBasicModel> {
    public transaction: TransactionSession

    constructor(transaction: TransactionSession) {
        this.transaction = transaction
    }

    static filterToGetById(id: ObjectId): object {
        return {
            _id: id,
            isDeleted: { $ne: true }
        }
    }

    static filterToGetActive(): object {
        return {
            isDeleted: { $ne: true }
        }
    }

    public optionsToInsert(): object {
        if (!this.transaction?.session) {
            return {}
        }

        return {
            session: this.transaction.session
        }
    }

    public optionsToUpdate(): object {
        const options = {
            new: true
        }

        if (!this.transaction?.session) {
            return options
        }

        options["session"] = this.transaction.session
        return options
    }

    static paramsToDelete(): object {
        return {
            isDeleted: true,
            deletedAt: new Date()
        }
    }

    public mapObjectToUpdate(entity: T): object {
        const data = {}

        const entries = Object.entries(entity)
        entries.map(([key, val]) => {
            if (val || val >= 0) {
                data[key] = val
            }
        })

        return data
    }
}

interface IRepository<T extends BaseBasicModel> {
    get(id: ObjectId): Promise<T>
    insert(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: ObjectId): Promise<void>
}

export {
    Repository,
    IRepository
}
