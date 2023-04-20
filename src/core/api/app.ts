import listenRequests from "./router"
import connectDatabase from "./connection"
import runMappers from "../mappings/main"

const app = () => {
    listenRequests()
    connectDatabase()
    runMappers()
}

export default app
