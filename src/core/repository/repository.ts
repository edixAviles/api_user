import { ObjectId } from "mongodb"

import BaseModel from "../domain/base.model"

interface Repository<T extends BaseModel> {
    get(id: ObjectId): Promise<T>
    save(entity: T): Promise<T>
    update(entity: T): Promise<T>
    delete(id: ObjectId): Promise<void>
}

export default Repository
