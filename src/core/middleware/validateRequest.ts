import { Request, Response, NextFunction } from "express"

const validateRequest = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        })

        next()
    } catch (e) {
        res.status(500).send(e.errors)
    }
}

export default validateRequest
