import ErrorResponse from "../../../core/response/error.response"

class DriverException {
    static ErrorIdNotProvided: string = "ERROR_ID_NOT_PROVIDED"

    static getError(code: string): ErrorResponse {
        const message = "" //_localizer[code]
        return new ErrorResponse(code, message)
    }

    static getErrorException(error: Error): ErrorResponse {
        return new ErrorResponse(error.name, error.message)
    }
}

export default DriverException
