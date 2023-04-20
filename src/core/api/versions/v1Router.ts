import express from "express"
import driverApi from "../../../modules/driver/api/driver.api"

const v1Router = express.Router()

v1Router.use("/driver", driverApi)
// All routes go here

export default v1Router
