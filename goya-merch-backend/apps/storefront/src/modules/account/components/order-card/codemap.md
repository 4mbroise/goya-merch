# goya-merch-backend/apps/storefront/src/modules/account/components/order-card/

## Responsibility
Presents a compact summary of a single order: display ID, creation date, total amount, and up to 4 item thumbnails with quantities. Provides a link to the full order details page.

## Design
Presentational (no client directive). Computes derived values via `useMemo`: `numberOfLines` (total item quantity) and `numberOfProducts` (distinct line items). Renders a grid of the first 3 items with `Thumbnail` component, and a "+N more" indicator when there are more than 4 items.

## Flow
**Props in**: `order: HttpTypes.StoreOrder`.

**Renders**:
- Order `display_id` prefixed with `#`
- Date (`new Date(order.created_at).toDateString()`)
- Formatted total via `convertToLocale` using the order's `currency_code`
- Item count label
- Thumbnail grid (max 3 items shown; "+N more" if > 4 products)
- "See details" button linking to `/account/orders/details/${order.id}`

## Integration
- Used by: `OrderOverview` (`../order-overview/`).
- Dependencies: `Thumbnail` from `@modules/products/components/thumbnail`, `convertToLocale` from `@lib/util/money`, `LocalizedClientLink`, `Button` from `@modules/common/components/ui`.
