import { toAmount } from "./money"

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function resolveShippingTotal(order: any): number {
  const directCandidates = [
    order?.shipping_total,
    order?.shipping_subtotal,
    order?.shipping_subtotal_incl_tax,
    order?.shipping_subtotal_excl_tax,
  ]

  for (const candidate of directCandidates) {
    const amount = toAmount(candidate)
    if (amount > 0) {
      return amount
    }
  }

  const shippingMethods = Array.isArray(order?.shipping_methods) ? order.shipping_methods : []
  return shippingMethods.reduce((sum: number, method: any) => {
    const methodAmount =
      toAmount(method?.total) ||
      toAmount(method?.amount) ||
      toAmount(method?.price) ||
      toAmount(method?.subtotal)

    return sum + methodAmount
  }, 0)
}
