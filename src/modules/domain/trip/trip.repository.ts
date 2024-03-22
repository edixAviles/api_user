import { ObjectId } from "mongodb"
import Repository from "api_utility/src/domain/repository"
import IRepository from "api_utility/src/domain/i_repository"

import Trip from "./trip.entity"
import TripModel from "./trip.model"
import { TripState } from "../../shared.domain/trip/trip.extra"

class TripRepository extends Repository<Trip> implements IRepository<Trip> {
  async get(id: ObjectId): Promise<Trip | null> {
    const document = await TripModel.findOne(Repository.filterToGetById(id))
    const entity = new Trip({ ...document })
    return document ? entity : null
  }

  async getTripsByDriver(
    driverId: ObjectId,
    state: TripState,
  ): Promise<Trip[]> {
    const filter = {
      ...Repository.filterToGetActive(),
      driverId,
      tripState: {
        $elemMatch: {
          state,
          isCurrent: true,
        },
      },
    }
    const documents = await TripModel.find(filter)

    const entities = new Array<Trip>()
    documents.forEach((document) => {
      if (document) {
        delete document.vehicles
        entities.push(new Trip({ ...document }))
      }
    })

    return entities
  }

  async searchTrips(
    departure: string,
    arrival: string,
    requestedSeats: number,
  ): Promise<Trip[]> {
    const departureRegex = new RegExp(`${departure}`, "i")
    const arrivalRegex = new RegExp(`${arrival}`, "i")

    const filter = {
      ...Repository.filterToGetActive(),
      "departure.city": departureRegex,
      "arrival.city": arrivalRegex,
      availableSeats: { $gte: requestedSeats },
      tripState: {
        $elemMatch: {
          state: TripState.Available,
          isCurrent: true,
        },
      },
    }
    const documents = await TripModel.find(filter)

    const entities = new Array<Trip>()
    documents.forEach((document) => {
      if (document) {
        delete document.vehicles
        entities.push(new Trip({ ...document }))
      }
    })

    return entities
  }

  async insert(entity: Trip): Promise<Trip> {
    const document = new TripModel({ ...entity })
    await document.save(this.optionsToInsert())

    const createdEntity = new Trip({ ...document })
    return createdEntity
  }

  async update(entity: Trip): Promise<Trip> {
    const dataToUpdate = this.mapObjectToUpdate(entity)
    const document = await TripModel.findOneAndUpdate(
      { _id: entity._id },
      dataToUpdate,
      this.optionsToUpdate(),
    )

    const updatedEntity = new Trip({ ...document })
    return updatedEntity
  }

  async delete(id: ObjectId): Promise<void> {
    await TripModel.findOneAndUpdate(
      { _id: id },
      Repository.paramsToDelete(),
      this.optionsToUpdate(),
    )
  }
}

export default TripRepository
