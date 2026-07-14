import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import { Resend } from "resend"
import {
  renderOrderConfirmationEmail,
  type OrderConfirmationData,
} from "./templates/order-confirmation"
import {
  renderShippingNotificationEmail,
  type ShippingNotificationData,
} from "./templates/shipping-notification"
import {
  renderOrderAdminConfirmationEmail,
  type OrderAdminConfirmationData,
} from "./templates/order-admin-confirmation"

export const RESEND_MODULE = "resendNotification"

type InjectedDependencies = Record<string, never>

type ProviderSendNotificationDTO = {
  to: string
  channel: string
  template: string
  data: Record<string, unknown>
  attachments?: {
    content: string
    filename: string
    content_type?: string
  }[]
}

type ProviderSendNotificationResultsDTO = {
  id: string
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
        return this.sendOrderConfirmation(notification.to, notification.data, notification.attachments)
      case "order.shipment_created":
        return this.sendShippingNotification(notification.to, notification.data)
      case "order.admin.confirmation":
        return this.sendOrderAdminNotification(notification.to, notification.data as unknown as OrderAdminConfirmationData)
      default:
        throw new Error(`Unknown email template: ${notification.template}`)
    }
  }

  private async sendOrderConfirmation(
    to: string,
    rawData: Record<string, unknown>,
    attachments: ProviderSendNotificationDTO["attachments"]
  ): Promise<ProviderSendNotificationResultsDTO> {
    const data = rawData as unknown as OrderConfirmationData

    console.log(`[resend] Preparing order confirmation for ${to}`)

    const html = await renderOrderConfirmationEmail(data)

    const emailParams: any = {
      from: this.fromAddress,
      to,
      subject: `Commande confirmée #${data.orderNumber} — GOYA`,
      html,
    }

    if (attachments && attachments.length > 0) {
      emailParams.attachments = attachments.map((att) => ({
        filename: att.filename,
        content: Buffer.from(att.content, "base64"),
      }))
    }

    const result = await this.resend.emails.send(emailParams)

    if (result.error) {
      console.error(`[resend] Resend API error:`, result.error)
      throw new Error(`Resend error: ${result.error.message}`)
    }

    console.log(`[resend] Email sent successfully, id: ${result.data!.id}`)
    return { id: result.data!.id }
  }

  private async sendShippingNotification(
    to: string,
    rawData: Record<string, unknown>
  ): Promise<ProviderSendNotificationResultsDTO> {
    const data = rawData as unknown as ShippingNotificationData

    const html = await renderShippingNotificationEmail(data)

    const result = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: `Ta commande #${data.orderNumber} est en route — GOYA`,
      html,
    })

    if (result.error) {
      throw new Error(`Resend error: ${result.error.message}`)
    }

    return { id: result.data!.id }
  }

  private async sendOrderAdminNotification(
    to: string,
    data: OrderAdminConfirmationData
  ): Promise<ProviderSendNotificationResultsDTO> {
    const html = await renderOrderAdminConfirmationEmail(data)

    const result = await this.resend.emails.send({
      from: this.fromAddress,
      to,
      subject: `Nouvelle commande #${data.orderNumber} — GOYA`,
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
