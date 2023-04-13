import Driver from "../../domain/driver/driver"
import Repository from "../../../core/domain/repository"

// El repo es para las operaciones puras y duras en BD
class DriverRepository implements Repository<Driver> {
    exists(t: Driver): boolean {
        throw new Error("Method not implemented.")
    }
    save(t: Driver): Driver {
        throw new Error("Method not implemented.")
    }
}

export default DriverRepository
