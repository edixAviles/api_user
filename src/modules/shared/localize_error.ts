import localizer from "./localization"
import ErrorResponse from "api_utility/src/response/error_response"

abstract class LocalizeError {
  public static getErrorByCode(
    code: string,
    params?: Map<string, string>,
  ): ErrorResponse {
    const keys = {}
    if (params != undefined) {
      for (const param of params.entries()) {
        keys[param[0]] = param[1]
      }
    }

    const message = localizer.t(code, keys)
    return new ErrorResponse(code, message)
  }
}

export default LocalizeError
