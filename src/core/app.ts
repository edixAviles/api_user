import listenRequests from "./api/router"
import runMappers from "./mappings/main"
import DatabaseConnection from "./database/databaseConnection"

import {
    username,
    password,
    cluster,
    database
} from "../core/database/credentials"
const app = () => {
    listenRequests()
    runMappers()
    DatabaseConnection.getInstance().connectDatabase(username, password, cluster, database)
}

export default app
