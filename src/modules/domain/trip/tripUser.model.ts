import { ObjectId } from "mongodb"
import mongooseModel from "api_utility/src/domain/mongoose_model"
import { CollectionsName } from "../../shared/shared.consts"
import { TripUserState } from "../../shared.domain/trip/tripUser.extra"

const properties = {
  numberOfSeats: {
    type: Number,
    required: true,
  },
  pickupLocation: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  tripState: [
    {
      state: {
        type: String,
        enum: TripUserState,
      },
      dateTimeAudit: {
        type: Date,
        required: true,
      },
      observation: {
        type: String,
      },
      isCurrent: {
        type: Boolean,
        required: true,
      },
    },
  ],
  tripId: {
    type: ObjectId,
    required: true,
    ref: CollectionsName.Trip,
  },
  userId: {
    type: ObjectId,
    required: true,
    ref: CollectionsName.User,
  },
}

const TripUserModel = mongooseModel(CollectionsName.TripUser, properties)
export default TripUserModel
