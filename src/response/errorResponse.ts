export default class ErrorResponse {
    public code: string
    public message: string
    public details: string

    public constructor(error: Error) {
        this.code = error.name
        this.message = error.message
    }
}