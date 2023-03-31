import ErrorResponse from "./errorResponse";

export default class Response<T> {
    public success: boolean
    public result: T
    public error: ErrorResponse

    public constructor(init?: Partial<Response<T>>) {
        Object.assign(this, init);
    }
}
