import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { INVOICE_MODULE } from "../modules/invoice"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const orderService = container.resolve(Modules.ORDER)
  const invoiceModuleService = container.resolve(INVOICE_MODULE)

  const order = await orderService.retrieveOrder(data.id, {
    relations: ["items", "shipping_address", "shipping_methods"],
  })

  // Generate next invoice number from DB (persistent across restarts)
  const existingInvoices = await invoiceModuleService.listInvoices(
    {},
    { order: { created_at: "DESC" }, take: 1 }
  )
  let nextSeq = 1
  if (existingInvoices.length > 0) {
    const match = existingInvoices[0].invoice_number.match(/GOYA-MERCH-(\d+)/)
    if (match) {
      nextSeq = parseInt(match[1], 10) + 1
    }
  }
  const invoiceNumber = `GOYA-MERCH-${String(nextSeq).padStart(4, "0")}`

  // Pre-create invoice DB record so it's persisted before the email is sent
  const shippingAddress = (order as any).shipping_address || {}
  const now = new Date()
  await invoiceModuleService.createInvoices({
    invoice_number: invoiceNumber,
    order_id: order.id,
    customer_email: order.email,
    customer_name: `${shippingAddress.first_name || ""} ${shippingAddress.last_name || ""}`.trim(),
    total_ttc: (order as any).total || 0,
    currency_code: (order as any).currency_code || "eur",
    file_key: `invoices/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${invoiceNumber}.pdf`,
    file_url: null,
    issued_at: now,
  })

  await notificationService.createNotifications({
    channel: "email",
    to: order.email!,
    template: "order.confirmation",
    data: { ...(order as unknown as Record<string, unknown>), invoiceNumber },
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
