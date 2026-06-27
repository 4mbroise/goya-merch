import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

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

  const fullfillments = (order as any).fulfillments as
    | { id: string; tracking_links: { tracking_url: string }[] }[]
    | undefined
  const fulfillment = fullfillments?.[fullfillments.length - 1] ?? null

  await notificationService.createNotifications({
    to: order.email!,
    channel: "email",
    template: "order.shipment_created",
    data: { order, fulfillment } as unknown as Record<string, unknown>,
  })
}

export const config: SubscriberConfig = {
  event: "order.shipment_created",
}
