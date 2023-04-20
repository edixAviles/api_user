import Driver from "../domain/driver.entity"
import DriverInput from "../shared/driver.input"
import DriverRepository from "./driver.repository"

// Realiza operaciones entre CRUDS desde el Repository
class DriverManager {
    private driverRepository = new DriverRepository()

    async insert(driverInput: DriverInput): Promise<Driver> {
        const driver = new Driver(driverInput)
        const entity = await this.driverRepository.save(driver)
        return entity
    }
}

export default DriverManager
