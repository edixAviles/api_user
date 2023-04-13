interface Repository<T> {
    exists(t: T): boolean
    save(t: T): T
}

export default Repository
