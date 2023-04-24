import ErrorResponse from "../../../../core/response/error.response"

class DriverException extends Error {
    constructor(error: ErrorResponse) {
        super(error.message)
        this.name = error.code
        this.message = error.message
        
        Object.setPrototypeOf(this, DriverException.prototype)
    }
}

export default DriverException
