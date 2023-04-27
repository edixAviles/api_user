import mongoose from "mongoose"

import {
    username,
    password,
    cluster,
    database
} from "./credentials"

const connectDatabase = () => {
    const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
    const options = {
        serverSelectionTimeoutMS: 5000
    }

    mongoose.connect(uri, options).then(() => {
        console.info("Mongo running in cloud")
    }).catch(err => {
        console.error(err)
    })
}

export default connectDatabase
