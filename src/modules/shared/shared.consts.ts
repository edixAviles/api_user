import { DataTaxDetails } from "../shared.domain/invoice/invoice.extra"

enum EntityFields {
    id = "id"
}

enum TypeMime {
    base64 = "base64"
}

enum CollectionsName {
    User = "users",
    Vehicle = "vehicles",
    Trip = "trips",
    TripUser = "tripusers",
    Rating = "ratings",
    Invoice = "invoices",
}

const servicePrice: number = 0.5
const taxLocal: DataTaxDetails = {
    detail: "IMPUESTO AL VALOR AGREGADO",
    tax: 0.12,
    observation: "IMPUESTO EN EC"
}

export {
    EntityFields,
    TypeMime,
    CollectionsName,
    servicePrice,
    taxLocal
}
