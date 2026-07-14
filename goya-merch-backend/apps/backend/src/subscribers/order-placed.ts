import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { randomUUID } from "crypto"
import { generateInvoicePDF } from "../modules/resend/templates/invoice-pdf"
import { uploadInvoiceToGitHub } from "../modules/resend/github-storage"
import { calculateInvoiceData, buildOrderConfirmationEmailData } from "../services/invoice/tax-calculation"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const orderService = container.resolve(Modules.ORDER)

  // The invoice module's MikroORM manager is not properly initialized at
  // startup (baseRepository_.manager_ is undefined), so we bypass the module
  // service and query the invoice table directly via the shared PG connection
  // (a knex instance registered as __pg_connection__ in the main container).
  const pgConnection = container.resolve("__pg_connection__" as any) as any

  try {
    console.log(`[order.placed] Handler started for order ${data.id}`)

    const order = await orderService.retrieveOrder(data.id, {
      relations: ["items", "shipping_address", "shipping_methods"],
      select: [
        "id",
        "display_id",
        "email",
        "currency_code",
        "created_at",
        // Requesting these total fields triggers Medusa's shouldIncludeTotals(),
        // which calls decorateCartTotals() to compute and populate them on the
        // order object. Without this, order.total/subtotal/tax_total are undefined
        // and the email + PDF invoice render 0,00 €.
        "total",
        "subtotal",
        "tax_total",
        "shipping_total",
        "shipping_subtotal",
        "shipping_tax_total",
        "discount_total",
      ],
    })

    console.log(`[order.placed] Order retrieved: display_id=${order.display_id}, email=${order.email}, total=${(order as any).total}`)

    // 1. Derive invoice number from the order's display_id so invoice and
    //    order numbers stay in sync. Medusa guarantees display_id uniqueness
    //    and atomicity, which also eliminates the previous race condition.
    const invoiceNumber = `GOYA-MERCH-${String(order.display_id).padStart(4, "0")}`
    console.log(`[order.placed] Invoice number: ${invoiceNumber} (order display_id=${order.display_id})`)

    // 2. Calculate invoice data (TVA, items, totals) and email data
    const invoiceData = calculateInvoiceData(order as any, invoiceNumber)
    const emailData = buildOrderConfirmationEmailData(order as any)

    // 3. Create invoice DB record
    const shippingAddress = (order as any).shipping_address || {}
    const now = new Date()
    await pgConnection("invoice").insert({
      id: `inv_${randomUUID()}`,
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

    console.log(`[order.placed] Invoice DB record created`)

    // 4. Generate PDF invoice
    const pdfBuffer = await generateInvoicePDF(invoiceData)
    console.log(`[order.placed] PDF generated, size: ${pdfBuffer.length} bytes`)

    // 5. Upload to GitHub (non-blocking — email sends regardless)
    try {
      const githubUrl = await uploadInvoiceToGitHub(invoiceNumber, pdfBuffer)
      console.log(`[order.placed] Invoice uploaded to GitHub: ${githubUrl}`)

      // 6. Update invoice record with GitHub URL
      await pgConnection("invoice")
        .where("invoice_number", invoiceNumber)
        .update({ file_url: githubUrl })
      console.log(`[order.placed] Invoice record updated with file_url`)
    } catch (err) {
      console.error(`[order.placed] GitHub upload FAILED for ${invoiceNumber}:`, err)
    }

    // 7. Send notification with PDF attachment
    await notificationService.createNotifications({
      channel: "email",
      to: order.email!,
      template: "order.confirmation",
      data: emailData as unknown as Record<string, unknown>,
      attachments: [
        {
          content: pdfBuffer.toString("base64"),
          filename: `facture-${invoiceNumber}.pdf`,
          content_type: "application/pdf",
        },
      ],
    } as any)

    console.log(`[order.placed] Notification dispatched successfully`)

    // 8. Notify all admin users
    try {
      const userModule = container.resolve(Modules.USER)
      const users = await userModule.listUsers()
      const adminEmails = users.map((u: any) => u.email).filter(Boolean)

      if (adminEmails.length === 0) {
        console.warn(`[order.placed] No admin users found`)
      } else {
        const adminUrl = process.env.MEDUSA_ADMIN_URL ?? "http://localhost:8000"
        const adminOrderUrl = `${adminUrl}/app/orders/${order.id}`
        const adminPayload = { ...emailData, adminOrderUrl }

        for (const adminEmail of adminEmails) {
          await notificationService.createNotifications({
            channel: "email",
            to: adminEmail,
            template: "order.admin.confirmation",
            data: adminPayload as unknown as Record<string, unknown>,
          } as any)
        }
        console.log(`[order.placed] Admin notifications sent to ${adminEmails.length} admin(s)`)
      }
    } catch (err) {
      console.error(`[order.placed] Admin notification failed (customer email already sent):`, err)
    }
  } catch (err) {
    console.error(`[order.placed] FATAL error for order ${data.id}:`, err)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
