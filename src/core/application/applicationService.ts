import TransactionManager from "../database/transactionManager"

abstract class ApplicationService {
    public transactionManager: TransactionManager

    constructor() {
        this.transactionManager = new TransactionManager()
    }
}

export default ApplicationService
