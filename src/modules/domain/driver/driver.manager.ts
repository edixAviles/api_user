import Driver from "./driver.entity"
import DriverInput from "../../domain.shared/driver/driver.input"
import DriverRepository from "../../core/driver/driverRepository"

// Realiza operaciones entre CRUDS desde el Repository
class DriverManager {
    private driverRepository = new DriverRepository()

    insert(driverInput: DriverInput): Driver {
        const driver = new Driver(driverInput)
        const entity = this.driverRepository.save(driver)
        return entity
    }
}

export default DriverManager
