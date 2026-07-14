import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import type { ShippingNotificationData } from "../modules/resend/templates/shipping-notification"

export default async function orderShipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string; no_notification?: boolean }>) {
  // shipment.created emits { id: fulfillment_id, no_notification }
  if (data.no_notification) return

  const notificationService = container.resolve(Modules.NOTIFICATION)
  const orderService = container.resolve(Modules.ORDER)
  const fulfillmentService = container.resolve(Modules.FULFILLMENT)
  const pgConnection = container.resolve("__pg_connection__" as any) as any

  // 1. Retrieve the fulfillment to get tracking labels and provider_id
  let fulfillment: any
  try {
    fulfillment = await fulfillmentService.retrieveFulfillment(data.id, {
      relations: ["labels", "items"],
    })
  } catch (err) {
    console.error(`[shipment.created] Could not retrieve fulfillment ${data.id}:`, err)
    return
  }

  // 2. Resolve order_id via DB join (FulfillmentDTO has no order_id)
  let orderId: string | null = null
  try {
    const rows = await pgConnection("fulfillment_item")
      .select("order_item.order_id as order_id")
      .join("order_line_item", "fulfillment_item.line_item_id", "order_line_item.id")
      .join("order_item", "order_line_item.id", "order_item.item_id")
      .where("fulfillment_item.fulfillment_id", data.id)
      .limit(1)

    if (rows.length > 0) {
      orderId = rows[0].order_id
    }
  } catch (err) {
    console.error(`[shipment.created] DB lookup failed for fulfillment ${data.id}:`, err)
    return
  }

  if (!orderId) {
    console.error(`[shipment.created] Could not find order for fulfillment ${data.id}`)
    return
  }

  // 3. Retrieve the order (no "customer" or "fulfillments" relations in Medusa 2.x)
  let order: any
  try {
    order = await orderService.retrieveOrder(orderId, {
      relations: ["items", "shipping_address"],
    })
  } catch (err) {
    console.error(`[shipment.created] Could not retrieve order ${orderId}:`, err)
    return
  }

  // 4. Extract tracking info from fulfillment labels
  const labels = fulfillment?.labels || []
  const trackingNumber = labels[0]?.tracking_number || "N/A"
  const trackingUrl =
    labels[0]?.tracking_url ||
    `https://www.laposte.fr/outils/suivre-vos-envois?code=${trackingNumber}`

  const shippingAddress = order.shipping_address || {}

  const payload: ShippingNotificationData = {
    customerName: shippingAddress.first_name || "Client",
    orderNumber: order.display_id?.toString() || order.id?.slice(-8).toUpperCase(),
    trackingNumber,
    trackingUrl,
    carrier: fulfillment?.provider_id || "Transporteur",
    items: (order.items || []).map((item: any) => ({
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

  // 5. Send notification
  try {
    await notificationService.createNotifications({
      to: order.email!,
      channel: "email",
      template: "order.shipment_created",
      data: payload as unknown as Record<string, unknown>,
    })
    console.log(`[shipment.created] Shipping notification sent for order ${orderId} (fulfillment ${data.id})`)
  } catch (err) {
    console.error(`[shipment.created] Failed to send shipping notification for order ${orderId}:`, err)
  }
}

export const config: SubscriberConfig = {
  event: "shipment.created",
}