import { ObjectId } from "mongodb"
import mongooseModel from "api_utility/src/domain/mongoose_model"

import { CollectionsName } from "../../shared/shared.consts"
import { PaymentMethods } from "../../shared.domain/invoice/invoice.extra"

const properties = {
    departure: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: PaymentMethods
    },

    numberOfSeats: {
        type: Number,
        required: true
    },
    unitPriceOfTrip: {
        type: Number,
        required: true
    },
    netPriceOfTrip: {
        type: Number,
        required: true
    },
    unitPriceOfService: {
        type: Number,
        required: true
    },
    netPriceOfService: {
        type: Number,
        required: true
    },
    netPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    taxes: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },

    taxDetails: [{
        detail: {
            type: String,
            required: true
        },
        tax: {
            type: Number,
            required: true
        },
        observation: {
            type: String
        },
    }],
    isPaid: {
        type: Boolean,
        required: true
    },
    tripUserId: {
        type: ObjectId,
        required: true,
        ref: CollectionsName.Trip
    }
}

const InvoiceModel = mongooseModel(CollectionsName.Invoice, properties)
export default InvoiceModel
