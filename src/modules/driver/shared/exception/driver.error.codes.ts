import localizer from "../localization"

import ErrorResponse from "../../../../core/response/error.response"

abstract class DriverErrorCodes {
    public static DriverErrorEntityNotFound: string = "DRIVER_ERROR_ENTITY_NOT_FOUND"
    public static DriverErrorIdNotProvided: string = "DRIVER_ERROR_ID_NOT_PROVIDED"

    public static getError(code: string, params?: object): ErrorResponse {
        const message = localizer.t(code, params)
        return new ErrorResponse(code, message)
    }

    public static getErrorException(error: Error): ErrorResponse {
        return new ErrorResponse(error.name, error.message)
    }
}

export default DriverErrorCodes
