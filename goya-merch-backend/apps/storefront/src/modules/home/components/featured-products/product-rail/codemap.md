# goya-merch-backend/apps/storefront/src/modules/home/components/featured-products/product-rail/

## Responsibility
Fetches and displays a horizontal grid of product previews for a single collection, with a "View all" link to the full collection page.

## Design
Async Server Component — calls `listProducts()` with `collection_id` filter and `*variants.calculated_price` field expansion to obtain priced products. Returns null if no products are found.

## Flow
- **Props in**: `collection: HttpTypes.StoreCollection`, `region: HttpTypes.StoreRegion`
- **Data call**: `listProducts({ regionId, queryParams: { collection_id, fields } })` from `@lib/data/products`
- **Children out**: Grid of `ProductPreview` components (one per product) wrapped in `<li>` elements

## Integration
- `@lib/data/products` for product fetching
- `@modules/products/components/product-preview` for individual product cards (with `isFeatured` prop)
- `@modules/common/components/interactive-link` for the "View all" link
- `@modules/common/components/ui` (Text)
- Consumed by `FeaturedProducts`
