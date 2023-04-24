import Response from "./response"
import ErrorResponse from "./error.response"

class ResponseManager<T> {
    onSuccess(response: T): Response<T> {
        return new Response<T>({
            success: true,
            result: response
        })
    }

    onError(error: ErrorResponse): Response<T> {
        return new Response<T>({
            success: false,
            error: error
        })
    }
}

export default ResponseManager
