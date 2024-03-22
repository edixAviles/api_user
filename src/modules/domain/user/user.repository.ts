import { ObjectId } from "mongodb"
import Repository from "api_utility/src/domain/repository"
import IRepository from "api_utility/src/domain/i_repository"

import User from "./user.entity"
import UserModel from "./user.model"

/**
 * This class, performs explicit operations of CRUD from Database
 */
class UserRepository extends Repository<User> implements IRepository<User> {
  async get(id: ObjectId): Promise<User | null> {
    const document = await UserModel.findOne(Repository.filterToGetById(id))

    const entity = new User({ ...document })
    return document ? entity : null
  }

  async insert(entity: User): Promise<User> {
    const document = new UserModel({ ...entity })
    await document.save(this.optionsToInsert())

    const createdEntity = new User({ ...document })
    return createdEntity
  }

  async update(entity: User): Promise<User> {
    const dataToUpdate = this.mapObjectToUpdate(entity)
    const document = await UserModel.findOneAndUpdate(
      { _id: entity._id },
      dataToUpdate,
      this.optionsToUpdate(),
    )

    const updatedEntity = new User({ ...document })
    return updatedEntity
  }

  async delete(id: ObjectId): Promise<void> {
    await UserModel.findOneAndUpdate(
      { _id: id },
      Repository.paramsToDelete(),
      this.optionsToUpdate(),
    )
  }
}

export default UserRepository
