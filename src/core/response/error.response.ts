class ErrorResponse {
    public code: string
    public message: string
    public details: string

    public constructor(code: string, message: string, details?: string) {
        this.code = code
        this.message = message
        this.details = details
    }
}

export default ErrorResponse
