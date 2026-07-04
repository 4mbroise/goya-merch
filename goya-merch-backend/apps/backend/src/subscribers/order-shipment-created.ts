import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import type { ShippingNotificationData } from "../modules/resend/templates/shipping-notification"

export default async function orderShipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; no_notification?: boolean }>) {
  if (data.no_notification) return

  const notificationService = container.resolve(Modules.NOTIFICATION)
  const orderService = container.resolve(Modules.ORDER)

  const order = await orderService.retrieveOrder(data.id, {
    relations: ["items", "shipping_address", "customer", "fulfillments"],
  })

  const fulfillments = (order as any).fulfillments as
    | { id: string; tracking_numbers: string[]; tracking_links: { tracking_number: string; url: string }[]; provider_id: string }[]
    | undefined
  const fulfillment = fulfillments?.[fulfillments.length - 1] ?? null

  const trackingNumber =
    fulfillment?.tracking_numbers?.[0] ||
    fulfillment?.tracking_links?.[0]?.tracking_number ||
    "N/A"

  const trackingUrl =
    fulfillment?.tracking_links?.[0]?.url ||
    `https://www.laposte.fr/outils/suivre-vos-envois?code=${trackingNumber}`

  const shippingAddress = (order as any).shipping_address || {}

  const payload: ShippingNotificationData = {
    customerName: (order as any).customer?.first_name || shippingAddress.first_name || "Client",
    orderNumber: (order as any).display_id?.toString() || (order as any).id?.slice(-8).toUpperCase(),
    trackingNumber,
    trackingUrl,
    carrier: fulfillment?.provider_id || "Transporteur",
    items: ((order as any).items || []).map((item: any) => ({
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

  await notificationService.createNotifications({
    to: (order as any).email!,
    channel: "email",
    template: "order.shipment_created",
    data: payload as unknown as Record<string, unknown>,
  })
}

export const config: SubscriberConfig = {
  event: "order.shipment_created",
}
