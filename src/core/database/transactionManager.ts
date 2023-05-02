import DatabaseConnectionSingleton from "./databaseConnection"
import TransactionSession from "./transactionSession"

class TransactionManager {
    private context: DatabaseConnectionSingleton

    constructor() {
        this.context = DatabaseConnectionSingleton.getInstance()
    }

    public async beginTransaction(): Promise<TransactionSession> {
        const session = await this.context.connection.startSession()
        session.startTransaction({
            readConcern: { level: "snapshot" },
            writeConcern: { w: "majority" }
        })

        const transaction = new TransactionSession(session)
        return transaction
    }
}

export default TransactionManager
