/**
 * GOYA Merch — Stock Seed Script
 *
 * Sets initial inventory levels for all GOYA product variants.
 * Run with:  npx medusa exec ./src/scripts/seed-goya-stock.ts
 *
 * Requires the catalog seed to have run first.
 */
import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
} from "@medusajs/framework/utils"
import { createInventoryLevelsWorkflow } from "@medusajs/medusa/core-flows"

const INITIAL_STOCK = 20 // units per variant

export default async function seedGoyaStock({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  // ── 1. Find the stock location ────────────────────────────────────────────
  const { data: locations } = await query.graph({
    entity: "stock_location",
    fields: ["id", "name"],
  })
  const location = locations[0]
  if (!location) throw new Error("No stock location found. Run db:migrate first.")
  logger.info(`Using stock location: ${location.name}`)

  // ── 2. Get all GOYA variant inventory item links ───────────────────────────
  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "title",
      "variants.id",
      "variants.sku",
      "variants.inventory_items.inventory_item_id",
    ],
    filters: {
      // Only GOYA products
      title: ["GOYA T-Shirt", "GOYA Hoodie", "GOYA — Vinyle LP", "GOYA — Poster A2", "GOYA Tote Bag"],
    },
  })

  const inventoryLevels: { inventory_item_id: string; location_id: string; stocked_quantity: number }[] = []

  for (const product of products) {
    for (const variant of product.variants ?? []) {
      const itemId = variant.inventory_items?.[0]?.inventory_item_id
      if (!itemId) {
        logger.warn(`No inventory item for variant ${variant.sku} — skipping`)
        continue
      }
      inventoryLevels.push({
        inventory_item_id: itemId,
        location_id: location.id,
        stocked_quantity: INITIAL_STOCK,
      })
    }
  }

  if (inventoryLevels.length === 0) {
    logger.warn("No inventory items found. Run seed-goya-catalog first.")
    return
  }

  // ── 3. Create inventory levels ─────────────────────────────────────────────
  logger.info(`Setting stock (${INITIAL_STOCK} units) for ${inventoryLevels.length} variants...`)
  await createInventoryLevelsWorkflow(container).run({
    input: { inventory_levels: inventoryLevels },
  })

  logger.info("Stock levels set successfully.")
}
