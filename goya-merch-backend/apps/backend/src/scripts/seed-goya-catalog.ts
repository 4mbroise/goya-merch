/**
 * GOYA Merch — Catalog Seed Script
 *
 * Creates the GOYA product collection and 5 products with variants.
 * Run with:  npx medusa exec ./src/scripts/seed-goya-catalog.ts
 *
 * Safe to re-run: checks for existing collection before inserting.
 */
import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  ProductStatus,
} from "@medusajs/framework/utils"
import {
  createCollectionsWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedGoyaCatalog({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModule = container.resolve(ModuleRegistrationName.PRODUCT)

  // ── 1. Guard: skip if GOYA collection already exists ──────────────────────
  const { data: existingCollections } = await query.graph({
    entity: "product_collection",
    fields: ["handle"],
    filters: { handle: "collection-goya-2025" },
  })

  if (existingCollections.length > 0) {
    logger.info("GOYA catalog already seeded. Skipping.")
    return
  }

  // ── 2. Fetch shipping profile (created by core migration) ─────────────────
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfiles[0]
  if (!shippingProfile) {
    throw new Error("No shipping profile found. Run db:migrate first.")
  }

  // ── 3. Create GOYA collection ─────────────────────────────────────────────
  logger.info("Creating GOYA collection...")
  const {
    result: [collection],
  } = await createCollectionsWorkflow(container).run({
    input: {
      collections: [
        {
          title: "Collection GOYA 2025",
          handle: "collection-goya-2025",
        },
      ],
    },
  })
  logger.info(`Collection created: ${collection.title}`)

  // ── 4. Create products ────────────────────────────────────────────────────
  logger.info("Creating GOYA products...")

  await createProductsWorkflow(container).run({
    input: {
      products: [
        // ── T-Shirt ──────────────────────────────────────────────────────────
        {
          title: "GOYA T-Shirt",
          collection_id: collection.id,
          description:
            "T-shirt GOYA 100% coton bio. Sérigraphie logo GOYA au dos.",
          handle: "goya-t-shirt",
          weight: 200,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://placehold.co/800x800/111111/ffffff?text=GOYA+T-Shirt",
            },
          ],
          options: [
            { title: "Taille", values: ["S", "M", "L", "XL", "XXL"] },
          ],
          variants: ["S", "M", "L", "XL", "XXL"].map((size) => ({
            title: size,
            sku: `GOYA-TSHIRT-${size}`,
            options: { Taille: size },
            manage_inventory: true,
            prices: [{ amount: 30, currency_code: "eur" }], // 30,00 €
          })),
        },

        // ── Hoodie ───────────────────────────────────────────────────────────
        {
          title: "GOYA Hoodie",
          collection_id: collection.id,
          description:
            "Hoodie GOYA molleton 350g. Logo brodé à la poitrine.",
          handle: "goya-hoodie",
          weight: 600,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://placehold.co/800x800/111111/ffffff?text=GOYA+Hoodie",
            },
          ],
          options: [
            { title: "Taille", values: ["S", "M", "L", "XL", "XXL"] },
          ],
          variants: ["S", "M", "L", "XL", "XXL"].map((size) => ({
            title: size,
            sku: `GOYA-HOODIE-${size}`,
            options: { Taille: size },
            manage_inventory: true,
            prices: [{ amount: 55, currency_code: "eur" }], // 55,00 €
          })),
        },

        // ── Vinyle ───────────────────────────────────────────────────────────
        {
          title: "GOYA — Vinyle LP",
          collection_id: collection.id,
          description:
            "Premier album de GOYA en édition vinyle 180g. Tirage limité.",
          handle: "goya-vinyle-lp",
          weight: 350,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://placehold.co/800x800/111111/ffffff?text=GOYA+Vinyle",
            },
          ],
          options: [{ title: "Édition", values: ["Standard", "Numérotée"] }],
          variants: [
            {
              title: "Standard",
              sku: "GOYA-VINYL-STD",
              options: { "Édition": "Standard" },
              manage_inventory: true,
              prices: [{ amount: 25, currency_code: "eur" }], // 25,00 €
            },
            {
              title: "Numérotée",
              sku: "GOYA-VINYL-NUM",
              options: { "Édition": "Numérotée" },
              manage_inventory: true,
              prices: [{ amount: 35, currency_code: "eur" }], // 35,00 €
            },
          ],
        },

        // ── Poster ───────────────────────────────────────────────────────────
        {
          title: "GOYA — Poster A2",
          collection_id: collection.id,
          description:
            "Poster officiel GOYA format A2 (42×59,4 cm), impression offset.",
          handle: "goya-poster-a2",
          weight: 100,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://placehold.co/800x800/111111/ffffff?text=GOYA+Poster",
            },
          ],
          options: [{ title: "Format", values: ["A2"] }],
          variants: [
            {
              title: "A2",
              sku: "GOYA-POSTER-A2",
              options: { Format: "A2" },
              manage_inventory: true,
              prices: [{ amount: 15, currency_code: "eur" }], // 15,00 €
            },
          ],
        },

        // ── Tote Bag ─────────────────────────────────────────────────────────
        {
          title: "GOYA Tote Bag",
          collection_id: collection.id,
          description:
            "Tote bag GOYA en coton naturel. Sérigraphie logo.",
          handle: "goya-tote-bag",
          weight: 150,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://placehold.co/800x800/111111/ffffff?text=GOYA+Tote+Bag",
            },
          ],
          options: [{ title: "Taille", values: ["Unique"] }],
          variants: [
            {
              title: "Unique",
              sku: "GOYA-TOTEBAG",
              options: { Taille: "Unique" },
              manage_inventory: true,
              prices: [{ amount: 18, currency_code: "eur" }], // 18,00 €
            },
          ],
        },
      ],
    },
  })

  logger.info("GOYA catalog seeded successfully.")
}
