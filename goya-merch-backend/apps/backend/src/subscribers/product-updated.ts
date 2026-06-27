import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"

const STOREFRONT_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000"
const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET ?? ""

async function revalidateStorefront() {
  if (!REVALIDATE_SECRET) {
    console.warn(
      "[product-updated] REVALIDATE_SECRET is not set, skipping cache revalidation"
    )
    return
  }

  try {
    const res = await fetch(
      `${STOREFRONT_URL}/api/revalidate?secret=${encodeURIComponent(REVALIDATE_SECRET)}`,
      { method: "POST" }
    )

    if (!res.ok) {
      console.error(
        `[product-updated] Revalidation request failed: ${res.status} ${res.statusText}`
      )
    }
  } catch (err) {
    console.error("[product-updated] Failed to call revalidation endpoint", err)
  }
}

export default async function productUpdatedHandler({
  event,
  container,
}: SubscriberArgs<{ id: string }>) {
  await revalidateStorefront()
}

export const config: SubscriberConfig = {
  event: [
    "product.created",
    "product.updated",
    "product.deleted",
    "product-variant.created",
    "product-variant.updated",
    "product-variant.deleted",
  ],
}
