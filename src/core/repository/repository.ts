import { ObjectId } from "mongodb"

import BaseBasicModel from "../domain/base.model"

abstract class Repository<T extends BaseBasicModel> {
    getDataToUpdate(entity: T): object {
        const data = {}

        const entries = Object.entries(entity)
        entries.map(([key, val]) => {
            if (!!val) {
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
