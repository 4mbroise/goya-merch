/**
 * GOYA Merch — Export Live Data Script
 *
 * Reads current product catalog and stock levels from the live Medusa database
 * and outputs a JSON structure ready to paste into the seed files.
 *
 * Run with:  npx medusa exec ./src/scripts/export-goya-data.ts
 */
import { MedusaContainer } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

interface ExportedVariant {
  sku: string
  title: string
  options: Record<string, string>
  price: number
  stock: number
}

interface ExportedProduct {
  title: string
  handle: string
  description: string
  weight: number
  status: string
  images: { url: string }[]
  options: { title: string; values: string[] }[]
  variants: ExportedVariant[]
}

interface ExportData {
  collection: { title: string; handle: string }
  products: ExportedProduct[]
}

export default async function exportGoyaData({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // ── 1. Get the GOYA collection ─────────────────────────────────────────────
  const { data: collections } = await query.graph({
    entity: "product_collection",
    fields: ["id", "title", "handle"],
    filters: { handle: "collection-goya-2025" },
  })

  if (collections.length === 0) {
    logger.warn("No GOYA collection found.")
    return
  }

  const collection = collections[0]
  logger.info(`Found collection: ${collection.title}`)

  // ── 2. Get all GOYA products with full variant data ─────────────────────────
  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "title",
      "handle",
      "description",
      "weight",
      "status",
      "images.url",
      "options.title",
      "options.values",
      "variants.id",
      "variants.title",
      "variants.sku",
      "variants.manage_inventory",
      "variants.options.id",
      "variants.options.value",
      "variants.options.title",
      "variants.money_amounts.id",
      "variants.money_amounts.amount",
      "variants.money_amounts.currency_code",
      "variants.inventory_items.inventory_item_id",
      "variants.inventory_items.id",
    ],
    filters: {
      collection_id: [collection.id],
    },
  })

  if (products.length === 0) {
    logger.warn("No GOYA products found.")
    return
  }

  // ── 3. Get all inventory levels for GOYA variants ───────────────────────────
  const variantIds = products.flatMap((p) => p.variants?.map((v: any) => v.id) ?? [])

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: [
      "id",
      "variants.id",
      "stock_levels.location_id",
      "stock_levels.stocked_quantity",
    ],
  })

  // Build a map: inventory_item_id → stock level
  const stockMap = new Map<string, number>()
  for (const item of inventoryItems as any[]) {
    const variant = item.variants?.[0]
    if (variant) {
      const level = item.stock_levels?.[0]
      stockMap.set(item.id, level?.stocked_quantity ?? 0)
    }
  }

  // ── 4. Build export JSON ─────────────────────────────────────────────────────
  const exportData: ExportData = {
    collection: {
      title: collection.title,
      handle: collection.handle,
    },
    products: [],
  }

  for (const product of products) {
    const optionsMap = new Map<string, string>()
    for (const opt of product.options ?? []) {
      optionsMap.set(opt.id, opt.title)
    }

    const variants: ExportedVariant[] = (product.variants ?? []).map((v: any) => {
      // Find the price (EUR)
      const priceAmount = v.money_amounts?.find(
        (ma: any) => ma.currency_code === "eur"
      )?.amount ?? 0

      // Find stock
      const itemId = v.inventory_items?.[0]?.inventory_item_id
      const stock = itemId ? stockMap.get(itemId) ?? 0 : 0

      // Build options object from variant options
      const options: Record<string, string> = {}
      for (const vo of v.options ?? []) {
        options[optionsMap.get(vo.id) ?? vo.title] = vo.value
      }

      return {
        sku: v.sku ?? "",
        title: v.title,
        options,
        price: priceAmount,
        stock,
      }
    })

    exportData.products.push({
      title: product.title,
      handle: product.handle,
      description: product.description ?? "",
      weight: product.weight ?? 0,
      status: product.status,
      images: product.images?.map((img: any) => ({ url: img.url })) ?? [],
      options: product.options?.map((opt: any) => ({
        title: opt.title,
        values: opt.values ?? [],
      })) ?? [],
      variants,
    })
  }

  // ── 5. Output ────────────────────────────────────────────────────────────────
  const json = JSON.stringify(exportData, null, 2)
  logger.info("══════════════════════════════════════════════════════════")
  logger.info("EXPORT JSON — paste this into your seed files")
  logger.info("══════════════════════════════════════════════════════════")
  console.log(json)
  logger.info("══════════════════════════════════════════════════════════")
}
