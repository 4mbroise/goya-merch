# goya-merch-backend/apps/storefront/src/modules/home/components/featured-products/

## Responsibility
Maps over an array of collections and renders a `ProductRail` for each, creating the featured-products section on the home page.

## Design
Async Server Component — iterates `collections` and emits a `<li>` per collection wrapping a `ProductRail`. Each rail handles its own product fetching.

## Flow
- **Props in**: `collections: HttpTypes.StoreCollection[]`, `region: HttpTypes.StoreRegion`
- **Children out**: One `ProductRail` per collection

## Integration
- `@modules/home/components/featured-products/product-rail` delegated for product data
- Collections and region are fetched by the page route and passed down
