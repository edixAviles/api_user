import listenRequests from "./api/router"
import runMappers from "./mappings/main"
import DatabaseConnectionSingleton from "./database/databaseConnection"

const app = () => {
    listenRequests()
    runMappers()
    DatabaseConnectionSingleton.getInstance().connectDatabase()
}

export default app
