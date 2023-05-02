import { ClientSession } from "mongoose"

class TransactionSession {
    public session: ClientSession

    constructor(session: ClientSession) {
        this.session = session
    }

    public async completeTransaction(): Promise<void> {
        await this.session.commitTransaction()
        await this.session.endSession()
    }

    public async cancellTransaction(): Promise<void> {
        await this.session.abortTransaction()
        await this.session.endSession()
    }
}

export default TransactionSession
