# goya-merch-backend/apps/backend/src/migration-scripts/

## Responsibility
Data seeding script that runs as part of the database migration pipeline. Populates the initial store foundation — sales channels, API keys, regions, tax zones, stock location, fulfillment sets, shipping options, product categories, and a sample product catalog with inventory levels.

## Design
- **Medusa Migration Script Pattern**: Exports a default async function receiving `{ container: MedusaContainer }`, designed to be run via `npx medusa db:migrate` or as part of the migration lifecycle. Unlike `src/scripts/` (one-off `medusa exec`), this is typically invoked during initial deployment setup.
- **Workflow Composition**: Uses Medusa's core-flows workflows (`createSalesChannelsWorkflow`, `createApiKeysWorkflow`, `createStoresWorkflow`, `createRegionsWorkflow`, `createTaxRegionsWorkflow`, `createStockLocationsWorkflow`, `createShippingOptionsWorkflow`, `createProductCategoriesWorkflow`, `createProductsWorkflow`, `createInventoryLevelsWorkflow`) to set up the entire e-commerce foundation.
- **France-First Configuration**: Creates a European region with EUR as default currency, 7 EU countries (`gb`, `de`, `dk`, `se`, `fr`, `es`, `it`), tax regions for each, and a "European Warehouse" stock location in Copenhagen.
- **Sample Products**: Seeds 4 Medusa-branded sample products (T-Shirt, Sweatshirt, Sweatpants, Shorts) with multiple variants and sizes, plus 4 product categories (Shirts, Sweatshirts, Pants, Merch).
- **Inventory**: Sets very high initial stock (1,000,000 units) for all inventory items to prevent out-of-stock during development.

## Flow
1. Migration pipeline executes the script after schema migrations are applied.
2. Script creates infrastructure: sales channel → API key (linked) → store (EUR/USD, default sales channel) → region (Europe, EUR) → tax regions → stock location (European Warehouse) → fulfillment set (Europe service zone) → shipping options (Standard + Express, manual_manual provider) → product categories → sample products with variants → inventory levels.
3. All workflows emit events that may trigger subscribers (e.g., product creation events trigger product-updated subscriber).

## Integration
- **Parent**: `src/` — Main source tree.
- **File**: `initial-data-seed.ts` — Full initial data seed.
- **Dependencies**: `@medusajs/framework` (`MedusaContainer`), `@medusajs/framework/utils` (registration keys, `Modules`), `@medusajs/medusa/core-flows` (all setup workflows).
- **Execution**: `npx medusa db:migrate` (or similar migration command).
