import express from "express"
import bodyParser from "body-parser"
import cors from "cors"

import v1Router from "./versions/v1Router"
import { isProduction } from "./config"

const listenRequests = () => {
    const port = process.env.PORT || 3000

    const origin = {
        origin: isProduction ? "test.com" : "*",
    }

    const router = express()

    router.use(bodyParser.json())
    router.use(bodyParser.urlencoded({ extended: true }))
    router.use(cors(origin))
    
    router.use("/api/v1", v1Router)

    router.listen(port, () => {
        console.log(`Server listening on ${port}`)
    })
}

export default listenRequests
