# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/store/

## Responsibility

Main product listing / store page. Displays all products with optional sort-by and pagination controls.

## Design

- **Async Server Component** — receives `searchParams` (`sortBy` and `page`) and `params.countryCode`.
- Delegates all rendering to `StoreTemplate` from `@modules/store/templates`.
- The `sortBy` parameter uses the `SortOptions` type from `@modules/store/components/refinement-list/sort-products` (e.g. `created_at`, `price_asc`, `price_desc`).

## Flow

1. Extracts `sortBy` and `page` from `searchParams` and `countryCode` from `params`.
2. Passes all three to `<StoreTemplate sortBy={...} page={...} countryCode={...} />`.

## Integration

- Template: `StoreTemplate` from `@modules/store/templates`.
- Types: `SortOptions` from `@modules/store/components/refinement-list/sort-products`.
