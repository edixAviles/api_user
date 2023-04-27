
import mongoose from "mongoose"

import {
    baseOptions,
    baseSchema
} from "./base.schema"

const mongooseModel = (className: string, properties: any): mongoose.Model<any> => {
    const schema = new mongoose.Schema({
        ...baseSchema,
        ...properties,
    }, baseOptions)

    const model = mongoose.model(className, schema)
    return model
}

export default mongooseModel
