enum PaymentMethods {
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
  BankTransfer = "BANK_TRANSFER",
}

class DataTaxDetails {
  detail: string
  tax: number
  observation: string
}

export { PaymentMethods, DataTaxDetails }
