# goya-merch-backend/apps/storefront/src/modules/products/components/product-preview/

## Responsibility

Renders a product card (thumbnail, title, and cheapest price) for use in grid listings: category pages, collection pages, store pages, and the home page featured product rail. Serves as the primary product summary component across the storefront.

## Design

- **Async server component** -- computes price on the server via `getProductPrice` utility; no client interactivity.
- **Link wrapper** -- the entire card is wrapped in `LocalizedClientLink` pointing to `/products/${product.handle}`, providing localized URL prefixed with country code.
- **Composition** -- delegates image rendering to `Thumbnail` (with `size="full"` and optional `isFeatured` flag) and price rendering to `PreviewPrice`.
- **Price strategy** -- calls `getProductPrice({ product })` (no variantId) to obtain `cheapestPrice` across all variants; only renders the price block if `cheapestPrice` exists.
- **Sub-component -- PreviewPrice**: a small server component that renders the calculated price, conditionally striking through the original price when `price_type === "sale"` and applying `text-ui-fg-interactive` styling.

## Flow

1. Props in: `product: HttpTypes.StoreProduct`, `isFeatured?: boolean`, `region: HttpTypes.StoreRegion` (region is accepted but currently unused -- the commented-out `listProducts` call suggests it was intended for region-scoped pricing).
2. Calls `getProductPrice({ product })` to extract `cheapestPrice`.
3. Renders a `<LocalizedClientLink>` containing:
   - `Thumbnail` component with the product thumbnail.
   - Product title as `<Text>`.
   - `PreviewPrice` displaying the cheapest variant price (with optional sale styling).
4. Output is an `<li>` item or direct child depending on the parent grid.

## Integration

- **Data utility**: `@lib/util/get-product-price` (`getProductPrice`)
- **Common components**: `Text` from `@modules/common/components/ui`, `LocalizedClientLink` from `@modules/common/components/localized-client-link`
- **Sibling components**: `Thumbnail` from `../thumbnail`
- **Types**: `HttpTypes.StoreProduct` from `@medusajs/types`, `VariantPrice` from `types/global`
- **Consumed by**: `related-products/index.tsx`, category/collection/store page templates, home page product-rail, and any route rendering product grids
