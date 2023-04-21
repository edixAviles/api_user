import Response from "./response"
import ErrorResponse from "./error.response"

class ResponseManager<T> {
    success: boolean

    onSuccess(response: T, statusCode: number): Response<T> {
        return new Response<T>({
            statusCode: statusCode,
            success: true,
            result: response
        })
    }

    onError(error: ErrorResponse, statusCode: number): Response<T> {
        return new Response<T>({
            statusCode: statusCode,
            success: false,
            error: error
        })
    }
}

export default ResponseManager
