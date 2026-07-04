# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/categories/[...category]/

## Responsibility

Catch-all category page that renders product listing filtered by a hierarchical category path (e.g. `/fr/categories/clothing/t-shirts`). Supports pagination and sort-by query parameters.

## Design

- **Catch-all dynamic segment** `[...category]` — receives an array of category handle segments (e.g. `["clothing", "t-shirts"]`).
- **Async Server Component** with `generateStaticParams` for ISR: pre-generates all known category × countryCode combinations.
- `generateMetadata` fetches the category by handle array to produce dynamic title and description.
- Delegates to `CategoryTemplate` from `@modules/categories/templates`.
- Accepts `sortBy` and `page` search params.

## Flow

1. `generateStaticParams` lists all categories and all regions to produce static paths.
2. On request, `CategoryPage` calls `getCategoryByHandle(params.category)`.
3. If category is falsy, calls `notFound()`.
4. Renders `<CategoryTemplate category={...} sortBy={...} page={...} countryCode={...} />`.

## Integration

- Data: `@lib/data/categories` (`getCategoryByHandle`, `listCategories`), `@lib/data/regions` (`listRegions`).
- Template: `CategoryTemplate` from `@modules/categories/templates`.
- Types: `HttpTypes.StoreProductCategory`, `StoreRegion` from `@medusajs/types`, `SortOptions` from `@modules/store/components/refinement-list/sort-products`.
