import { AnySchema } from "yup"
import { Request, Response, NextFunction } from "express"

const validateRequest = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })

        next()
    } catch (e) {
        res.status(500).send()
    }
}

export default validateRequest
