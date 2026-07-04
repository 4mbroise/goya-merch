# goya-merch-backend/apps/storefront/src/modules/products/components/product-price/

## Responsibility

Displays the product pricing information on the product detail page, including the calculated price, original price (for sales), percentage discount badge, and a "From" prefix when showing the cheapest price across variants.

## Design

- **Client component** -- no `"use client"` directive observed in the source, but it is consumed by the client component `ProductActions` and uses React state-adjacent logic (pure computation from props only, so it can be server-compatible; however it is always rendered within a client context).
- **Dual price strategy** -- takes an optional `variant` prop. If provided, shows `variantPrice`; otherwise shows `cheapestPrice` with a "From" prefix to indicate multiple variants exist.
- **Skeleton fallback** -- if `selectedPrice` is falsy, renders a `w-32 h-9 bg-gray-100 animate-pulse` placeholder div.
- **Sale display** -- when `price_type === "sale"`, applies `text-ui-fg-interactive` color, shows original price with line-through, and renders the percentage difference (`percentage_diff`).
- **Data attributes** -- `data-testid="product-price"` and `data-testid="original-product-price"` with `data-value` attributes containing the numeric prices.

## Flow

1. Props in: `product: HttpTypes.StoreProduct`, `variant?: HttpTypes.StoreProductVariant`
2. Calls `getProductPrice({ product, variantId: variant?.id })` to get `cheapestPrice` and `variantPrice`.
3. Selects `variantPrice` if a variant is provided, otherwise falls back to `cheapestPrice`.
4. If no price is available, renders a skeleton placeholder.
5. Renders calculated price, optionally with "From " prefix, sale strikethrough, and discount percentage.

## Integration

- **Data utility**: `@lib/util/get-product-price` (`getProductPrice`)
- **Common components**: `clx` from `@modules/common/components/ui`
- **Consumed by**: `product-actions/index.tsx` (ProductActions) on the product detail page
