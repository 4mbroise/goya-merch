import { toAmount, formatMoney } from "../../lib/money"
import { formatDate, resolveShippingTotal } from "../../lib/order-utils"
import { SELLER_INFO, TVA_RATE } from "../../lib/seller-config"
import type { InvoiceData } from "../../modules/resend/templates/invoice-pdf"
import type { OrderConfirmationData } from "../../modules/resend/templates/order-confirmation"

export function calculateInvoiceData(
  order: any,
  invoiceNumber: string
): InvoiceData {
  const currency = order.currency_code || "eur"
  const shippingAddress = order.shipping_address || {}
  const subtotal = toAmount(order.subtotal)
  const shippingTotal = resolveShippingTotal(order)
  const total = toAmount(order.total)

  const invoiceItems = (order.items || []).map((item: any) => {
    const unitPrice = toAmount(item.unit_price)
    const quantity = Number(item.quantity)
    const unitPriceHT = SELLER_INFO.tvaExempt
      ? unitPrice
      : Math.round(unitPrice / (1 + TVA_RATE / 100))
    return {
      description: `${item.title}${item.variant_title ? ` — ${item.variant_title}` : ""}`,
      quantity,
      unitPriceHT,
      totalHT: unitPriceHT * quantity,
    }
  })

  const totalTTC = total
  const taxableBaseTTC = subtotal + shippingTotal
  const subtotalHT = SELLER_INFO.tvaExempt
    ? taxableBaseTTC
    : Math.round(taxableBaseTTC / (1 + TVA_RATE / 100))

  const taxFromOrder = toAmount(order.tax_total)
  const tvaAmount = SELLER_INFO.tvaExempt
    ? 0
    : taxFromOrder > 0
      ? taxFromOrder
      : Math.max(totalTTC - subtotalHT, 0)

  return {
    invoiceNumber,
    invoiceDate: formatDate(order.created_at),
    orderId: order.id,
    seller: SELLER_INFO,
    customer: {
      firstName: shippingAddress.first_name || "",
      lastName: shippingAddress.last_name || "",
      address: [shippingAddress.address_1, shippingAddress.address_2].filter(Boolean).join(", "),
      city: shippingAddress.city || "",
      postalCode: shippingAddress.postal_code || "",
      country: shippingAddress.country_code?.toUpperCase() || "",
      email: order.email || "",
    },
    items: invoiceItems,
    subtotalHT,
    shippingTTC: shippingTotal,
    tvaRate: TVA_RATE,
    tvaAmount,
    totalTTC,
    currency,
    paymentMethod: "Carte bancaire (Stripe)",
  }
}

export function buildOrderConfirmationEmailData(
  order: any
): OrderConfirmationData {
  const currency = order.currency_code || "eur"
  const shippingAddress = order.shipping_address || {}
  const subtotal = toAmount(order.subtotal)
  const shippingTotal = resolveShippingTotal(order)
  const total = toAmount(order.total)

  const items = (order.items || []).map((item: any) => ({
    title: item.title || item.product_title || "",
    variant: item.variant_title || "",
    quantity: Number(item.quantity),
    totalPrice: formatMoney(toAmount(item.unit_price) * Number(item.quantity), currency),
  }))

  return {
    customerName: order.customer?.first_name || shippingAddress.first_name || "Client",
    orderNumber: order.display_id?.toString() || order.id?.slice(-8).toUpperCase(),
    orderDate: formatDate(order.created_at),
    items,
    subtotal: formatMoney(subtotal, currency),
    shipping: shippingTotal === 0 ? "Offert" : formatMoney(shippingTotal, currency),
    total: formatMoney(total, currency),
    shippingAddress: {
      address: [shippingAddress.address_1, shippingAddress.address_2].filter(Boolean).join(", "),
      city: shippingAddress.city || "",
      postalCode: shippingAddress.postal_code || "",
      country: shippingAddress.country_code?.toUpperCase() || "",
    },
  }
}
