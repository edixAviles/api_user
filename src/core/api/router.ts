import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import middleware from "i18next-http-middleware"

import v1Router from "./versions/v1Router"
import localizer from "../../modules/driver/shared/localization"
import { isProduction } from "./config"

const listenRequests = () => {
    const port = process.env.PORT || 3000

    const origin = {
        origin: isProduction ? "test.com" : "*",
    }

    const app = express()

    app.use(middleware.handle(localizer))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors(origin))

    app.use("/api/v1", v1Router)

    app.listen(port, () => {
        console.info(`Server listening on ${port}`)
    })
}

export default listenRequests
