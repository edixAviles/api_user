import DatabaseConnection from "api_utility/src/database/database_connection"

import listenRequests from "./api/router"
import runMappers from "./mappings/main"
import {
    username,
    password,
    cluster,
    database
} from "./credentials"

const app = () => {
    listenRequests()
    runMappers()
    DatabaseConnection.getInstance().connectDatabase(username, password, cluster, database)
}

export default app
