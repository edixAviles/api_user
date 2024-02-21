import localizer from "./localization"
import ErrorResponse from "../../core/response/error.response"

abstract class LocalizeError {
    public static getErrorByCode(code: string, params?: object): ErrorResponse {
        const message = localizer.t(code, params)
        return new ErrorResponse(code, message)
    }
}

export default LocalizeError
