export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount)
}

export function toAmount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (value && typeof value === "object") {
    // Medusa 2.x BigNumber objects have { numeric_, raw_, bignumber_ }
    const numericValue = (value as Record<string, unknown>).numeric_
    if (typeof numericValue === "number" || typeof numericValue === "string") {
      return toAmount(numericValue)
    }
    // Some Medusa amount wrappers use { value: number }
    const maybeValue = (value as Record<string, unknown>).value
    if (typeof maybeValue === "number" || typeof maybeValue === "string") {
      return toAmount(maybeValue)
    }
  }

  return 0
}
