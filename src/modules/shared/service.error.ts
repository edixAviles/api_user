import localizer from "./localization"
import ErrorResponse from "../../core/response/error.response"

abstract class ServiceError {
    public static getErrorByCode(code: string, params?: object): ErrorResponse {
        const message = localizer.t(code, params)
        return new ErrorResponse(code, message)
    }

    public static getException(error: Error): ErrorResponse {
        return new ErrorResponse(error.name, error.message)
    }
}

export default ServiceError
