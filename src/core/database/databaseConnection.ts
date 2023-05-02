import mongoose, { Connection } from "mongoose"

import {
    username,
    password,
    cluster,
    database
} from "./credentials"

class DatabaseConnectionSingleton {
    private static context: DatabaseConnectionSingleton
    public connection: Connection

    private constructor() {
    }

    public connectDatabase = () => {
        const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority`
        const options = {
        }

        mongoose.connect(uri, options).then(() => {
            this.connection = mongoose.connection
            console.info("Mongo's running")
        })

    }

    public static getInstance(): DatabaseConnectionSingleton {
        if (!this.context) {
            this.context = new DatabaseConnectionSingleton()
        }

        return this.context
    }
}

export default DatabaseConnectionSingleton
