import ErrorResponse from "../../../../core/response/error.response"
import DriverException from "./driver.exception"

abstract class DriverErrorCodes {
    public static DriverErrorEntityNotFound: string = "DRIVER_ERROR_ENTITY_NOT_FOUND"
    public static DriverErrorIdNotProvided: string = "DRIVER_ERROR_ID_NOT_PROVIDED"

    public static getError(code: string): ErrorResponse {
        const message = "" //_localizer[code]
        return new ErrorResponse(code, message)
    }

    public static getErrorException(error: Error): ErrorResponse {
        return new ErrorResponse(error.name, error.message)
    }
}

export default DriverErrorCodes
