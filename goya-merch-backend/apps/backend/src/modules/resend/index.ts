import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import { Resend } from "resend"
import { generateInvoicePDF, type InvoiceData } from "./templates/invoice-pdf"
import { uploadInvoiceToGitHub } from "./github-storage"
import {
  renderOrderConfirmationEmail,
  type OrderConfirmationData,
} from "./templates/order-confirmation"
import {
  renderShippingNotificationEmail,
  type ShippingNotificationData,
} from "./templates/shipping-notification"

export const RESEND_MODULE = "resendNotification"

type InjectedDependencies = Record<string, never>

type ProviderSendNotificationDTO = {
  to: string
  channel: string
  template: string
  data: Record<string, unknown>
}

type ProviderSendNotificationResultsDTO = {
  id: string
}

const SELLER_INFO = {
  name: process.env.SELLER_NAME || "GOYA Merchandise",
  address: process.env.SELLER_ADDRESS || "",
  city: process.env.SELLER_CITY || "",
  email: process.env.SELLER_EMAIL || "contact@goya-merch.fr",
  siret: process.env.SELLER_SIRET,
  tvaNumber: process.env.SELLER_TVA_NUMBER,
  tvaExempt: process.env.SELLER_TVA_EXEMPT === "true",
}

const TVA_RATE = parseFloat(process.env.TVA_RATE || "20")

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount)
}

function toAmount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
  }

  if (value && typeof value === "object") {
    const maybeValue = (value as Record<string, unknown>).value
    if (typeof maybeValue === "number" || typeof maybeValue === "string") {
      return toAmount(maybeValue)
    }
  }

  return 0
}

function resolveShippingTotal(order: any): number {
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

class ResendNotificationProvider {
  private resend: Resend
  private fromAddress: string

  constructor(_deps: InjectedDependencies) {
    this.resend = new Resend(process.env.RESEND_API_KEY)
    this.fromAddress = process.env.RESEND_FROM_ADDRESS || "GOYA Merchandise <noreply@goya-merch.fr>"
  }

  static identifier = RESEND_MODULE

  async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    switch (notification.template) {
      case "order.confirmation":
        return this.sendOrderConfirmation(notification.to, notification.data)
      case "order.shipment_created":
        return this.sendShippingNotification(notification.to, notification.data)
      default:
        throw new Error(`Unknown email template: ${notification.template}`)
    }
  }

  private async sendOrderConfirmation(
    to: string,
    rawData: Record<string, unknown>
  ): Promise<ProviderSendNotificationResultsDTO> {
    const order = rawData as any

    const currency = order.currency_code || "eur"
    const items = (order.items || []).map((item: any) => ({
      title: item.title || item.product_title || "",
      variant: item.variant_title || "",
      quantity: item.quantity,
      totalPrice: formatMoney(item.unit_price * item.quantity, currency),
    }))

    const shippingAddress = order.shipping_address || {}
    const subtotal = toAmount(order.subtotal)
    const shippingTotal = resolveShippingTotal(order)
    const total = toAmount(order.total)

    const emailData: OrderConfirmationData = {
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

    // Generate PDF invoice
    const invoiceItems = (order.items || []).map((item: any) => {
      const unitPrice = toAmount(item.unit_price)
      const unitPriceHT = SELLER_INFO.tvaExempt
        ? unitPrice
        : Math.round(unitPrice / (1 + TVA_RATE / 100))
      return {
        description: `${item.title}${item.variant_title ? ` — ${item.variant_title}` : ""}`,
        quantity: item.quantity,
        unitPriceHT,
        totalHT: unitPriceHT * item.quantity,
      }
    })

    const totalTTC = total
    const taxableBaseTTC = subtotal + shippingTotal
    const subtotalHT = SELLER_INFO.tvaExempt
      ? taxableBaseTTC
      : Math.round(taxableBaseTTC / (1 + TVA_RATE / 100))

    // Prefer the authoritative Medusa tax_total for displayed TVA when available
    const taxFromOrder = toAmount(order.tax_total)
    const tvaAmount = SELLER_INFO.tvaExempt
      ? 0
      : taxFromOrder > 0
        ? taxFromOrder
        : Math.max(totalTTC - subtotalHT, 0)

    const invoiceData: InvoiceData = {
      invoiceNumber: order.invoiceNumber as string,
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
        email: order.email || to,
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

    const [html, pdfBuffer] = await Promise.all([
      renderOrderConfirmationEmail(emailData),
      generateInvoicePDF(invoiceData),
    ])

    // Upload PDF to GitHub (invoice record was already created in subscriber)
    await uploadInvoiceToGitHub(invoiceData.invoiceNumber, pdfBuffer)

    const result = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: `Commande confirmée #${emailData.orderNumber} — GOYA`,
      html,
      attachments: [
        {
          filename: `facture-${invoiceData.invoiceNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`)
    }

    return { id: result.data!.id }
  }

  private async sendShippingNotification(
    to: string,
    rawData: Record<string, unknown>
  ): Promise<ProviderSendNotificationResultsDTO> {
    const { order, fulfillment } = rawData as any

    const trackingNumber =
      fulfillment?.tracking_numbers?.[0] ||
      fulfillment?.tracking_links?.[0]?.tracking_number ||
      "N/A"

    const trackingUrl =
      fulfillment?.tracking_links?.[0]?.url ||
      `https://www.laposte.fr/outils/suivre-vos-envois?code=${trackingNumber}`

    const shippingAddress = order?.shipping_address || {}

    const emailData: ShippingNotificationData = {
      customerName: order?.customer?.first_name || shippingAddress.first_name || "Client",
      orderNumber: order?.display_id?.toString() || order?.id?.slice(-8).toUpperCase(),
      trackingNumber,
      trackingUrl,
      carrier: fulfillment?.provider_id || "Transporteur",
      items: (order?.items || []).map((item: any) => ({
        title: item.title || item.product_title || "",
        variant: item.variant_title || "",
        quantity: item.quantity,
      })),
      shippingAddress: {
        address: [shippingAddress.address_1, shippingAddress.address_2].filter(Boolean).join(", "),
        city: shippingAddress.city || "",
        postalCode: shippingAddress.postal_code || "",
        country: shippingAddress.country_code?.toUpperCase() || "",
      },
    }

    const html = await renderShippingNotificationEmail(emailData)

    const result = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: `Ta commande #${emailData.orderNumber} est en route — GOYA`,
      html,
    })

    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`)
    }

    return { id: result.data!.id }
  }
}

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [ResendNotificationProvider],
})
