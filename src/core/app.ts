import listenRequests from "./api/router"
import connectDatabase from "./database/connect"
import runMappers from "./mappings/main"

const app = () => {
    listenRequests()
    connectDatabase()
    runMappers()
}

export default app
