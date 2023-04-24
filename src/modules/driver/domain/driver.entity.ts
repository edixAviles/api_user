import { AutoMap } from "@automapper/classes"
import BaseModel from "../../../core/domain/base.model"

class Driver extends BaseModel {
    @AutoMap()
    public identification: string

    @AutoMap()
    public name: string

    @AutoMap()
    public lastName: string

    @AutoMap()
    public email: string

    @AutoMap()
    public phone: string

    constructor(document?: any) {
        super(document)
    }
}

export default Driver
