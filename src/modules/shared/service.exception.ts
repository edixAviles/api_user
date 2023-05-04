import ErrorResponse from "../../core/response/error.response"

class ServiceException extends Error {
    constructor(error: ErrorResponse) {
        super(error.message)
        
        this.name = error.code
        this.message = error.message

        Object.setPrototypeOf(this, ServiceException.prototype)
    }
}

export default ServiceException
