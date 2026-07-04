# goya-merch-backend/apps/storefront/src/types/

## Responsibility

Domain-specific TypeScript type definitions used across the storefront. Extends the Medusa SDK types (`@medusajs/types`) with application-level shapes for featured products, variant pricing, free-shipping price targets, and SVG icon component props.

## Design

- **Selective extension pattern**: Rather than redefining Medusa domain models, these types compose with or extend SDK types (`StorePrice` from `@medusajs/types`) to add storefront-specific computed fields (e.g., `percentage_diff`, `target_reached`).
- **Leaf type granularity**: Each type is narrowly scoped to a single concern:
  - `FeaturedProduct` — Minimal product shape for hero/carousel spotlights (id, title, handle, optional thumbnail).
  - `VariantPrice` — Flattened price representation with pre-computed display strings, numeric values, and discount percentage, used in product cards and line items.
  - `StoreFreeShippingPrice` — Augments `StorePrice` with free-shipping progress data (target reached, remaining amount, percentage).
  - `IconProps` — Reusable SVG component contract (color, size, standard SVG attributes) for inline icon components.

## Flow

1. Types are imported directly by consumer files in `modules/`, `lib/`, and `app/`.
2. `FeaturedProduct` is consumed by home/landing page modules that render product spotlights.
3. `VariantPrice` is used by product detail views, cart line items, and checkout summaries where price display logic is needed.
4. `StoreFreeShippingPrice` flows from cart/region data-fetching functions to the cart drawer and checkout progress indicator.
5. `IconProps` is implemented by each SVG icon component in `modules/common/components` and used throughout the UI.

## Integration

- **Dependencies**: `@medusajs/types` (v2.15.5) — provides the `StorePrice` base type extended by `StoreFreeShippingPrice`.
- **Consumers**: `FeaturedProduct` → `modules/home/`, `VariantPrice` → `modules/products/`, `StoreFreeShippingPrice` → `modules/cart/`, `IconProps` → `modules/common/components/`.
- **No runtime impact**: All files are pure `.ts` type declarations, erased at compile time.
