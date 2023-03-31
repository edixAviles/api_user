import { AnySchema } from "yup"
import {Request, Response, NextFunction} from "express"

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })
    
        next()
    } catch (e) {

    }
}

export default validate