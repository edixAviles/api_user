import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import v1Router from "./versions/v1Router"
import { isProduction } from "./config"

const port = process.env.PORT || 3000
const origin = {
    origin: isProduction ? "https://whitelabel.com" : "*",
}

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))

app.use("/api/v1", v1Router)

app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

export default app
