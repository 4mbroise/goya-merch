# goya-merch-backend/apps/storefront/src/app/[countryCode]/

## Responsibility

Dynamic segment that captures the ISO 3166-1 alpha-2 country code (e.g. `fr`, `us`) for region-aware pricing and localization. Acts as the root branching point between the main store and checkout route groups.

## Design

- **Dynamic Segment** `[countryCode]` — the first path segment after `/`.
- No layout or page at this level; it immediately delegates to one of two Route Groups: `(main)` for the store UI or `(checkout)` for the checkout flow.
- The `countryCode` value is passed to child pages via `params.countryCode` and consumed by lib functions like `getRegion()` and `listProducts()`.

## Flow

1. Incoming URL like `/fr/products/tshirt` matches `[countryCode]`.
2. The segment value (`fr`) is available as `params.countryCode` to any `page.tsx` or `layout.tsx` in the subtree.
3. The request is further routed to either `(main)/` or `(checkout)/` depending on the URL path.

## Integration

- Consumed by `@lib/data/regions` (`getRegion`, `listRegions`), `@lib/data/products`, `@lib/data/collections`, `@lib/data/categories` for region-scoped data fetching.
