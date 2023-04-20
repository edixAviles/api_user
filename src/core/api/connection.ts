import mongoose from "mongoose"
import {
    username,
    password,
    cluster,
    database
} from "./config"

const connectDatabase = () => {
    const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
    const options = {
        serverSelectionTimeoutMS: 5000
    }
    
    mongoose.connect(uri, options).then(() => {
        console.log("Mongo running in cloud")
    }).catch(err => {
        console.log(err)
    })
}

export default connectDatabase
