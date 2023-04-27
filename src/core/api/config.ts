const isProduction = process.env.NODE_ENV === "production"
const limitRequest = "5mb"

export {
    isProduction,
    limitRequest
}
