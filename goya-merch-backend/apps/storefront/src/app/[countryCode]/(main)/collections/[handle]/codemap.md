# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/collections/[handle]/

## Responsibility

Collection page showing all products in a given collection (e.g. "All Products", "Limited Edition"). Supports pagination and sort-by query parameters.

## Design

- **Dynamic segment** `[handle]` — the collection's URL handle.
- **Async Server Component** with `generateStaticParams` for ISR: pre-generates all collection × countryCode combinations.
- `generateMetadata` fetches the collection to produce dynamic title.
- Delegates to `CollectionTemplate` from `@modules/collections/templates`.
- Accepts `sortBy` and `page` search params.
- Uses `PRODUCT_LIMIT = 12` for pagination.

## Flow

1. `generateStaticParams` lists all collections with products and all regions, then creates a cartesian product of valid paths.
2. On request, fetches collection by handle via `getCollectionByHandle()`.
3. If collection is falsy, calls `notFound()`.
4. Renders `<CollectionTemplate collection={...} page={...} sortBy={...} countryCode={...} />`.

## Integration

- Data: `@lib/data/collections` (`getCollectionByHandle`, `listCollections`), `@lib/data/regions` (`listRegions`).
- Template: `CollectionTemplate` from `@modules/collections/templates`.
- Types: `StoreCollection`, `StoreRegion` from `@medusajs/types`, `SortOptions` from `@modules/store/components/refinement-list/sort-products`.
