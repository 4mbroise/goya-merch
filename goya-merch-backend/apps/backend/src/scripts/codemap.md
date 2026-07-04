# goya-merch-backend/apps/backend/src/scripts/

## Responsibility
One-off executable scripts designed to be run via `npx medusa exec`. Provide data seeding for the GOYA product catalog (5 products, variants, pricing) and initial inventory stock levels for all variants.

## Design
- **Medusa Executable Script Pattern**: Each file exports a default async function receiving `{ container: MedusaContainer }`. Medusa's `exec` command loads the application, resolves the container, and runs the function.
- **Idempotent Seed Design**: `seed-goya-catalog.ts` checks for an existing collection handle (`"collection-goya-2025"`) before creating products, making it safe to re-run. `seed-goya-stock.ts` requires the catalog seed to have run first.
- **Workflow Composition**: Both scripts use Medusa's built-in workflows (`createCollectionsWorkflow`, `createProductsWorkflow`, `createInventoryLevelsWorkflow`) from `@medusajs/medusa/core-flows` rather than calling services directly, ensuring proper event emission and side-effect execution.
- **Two Scripts**:
  1. `seed-goya-catalog.ts` — Creates the "Collection GOYA 2025" collection and 5 products: T-Shirt (5 sizes), Hoodie (5 sizes), Vinyle LP (2 editions), Poster A2 (1 format), Tote Bag (1 size). All prices in EUR.
  2. `seed-goya-stock.ts` — Sets initial inventory levels (20 units) for every GOYA product variant at the first available stock location.

## Flow
1. `npx medusa exec ./src/scripts/seed-goya-catalog.ts` runs the catalog seed.
2. `npx medusa exec ./src/scripts/seed-goya-stock.ts` runs the stock seed (post-catalog).
3. Both use `QUERY` for guard checks and data retrieval, then invoke Medusa core-flows workflows for the actual mutations.
4. Logging via the container-resolved logger for progress visibility.

## Integration
- **Parent**: `src/` — Main source tree.
- **Files**:
  - `seed-goya-catalog.ts` — Product catalog seeding.
  - `seed-goya-stock.ts` — Inventory level seeding.
- **Dependencies**: `@medusajs/framework` (`MedusaContainer`), `@medusajs/framework/utils` (registration keys), `@medusajs/medusa/core-flows` (workflows).
- **Execution**: `npx medusa exec` command-line tool.
