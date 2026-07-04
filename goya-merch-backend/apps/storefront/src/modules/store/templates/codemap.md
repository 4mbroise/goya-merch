# goya-merch-backend/apps/storefront/src/modules/store/templates/

## Responsibility
Provides the two template compositions that power the /store page: `StoreTemplate` (page layout with refinement + product grid) and `PaginatedProducts` (async data-fetching product grid with pagination).

## Design
Template composition folder — `StoreTemplate` is a server component that lays out `RefinementList` alongside a `Suspense`-wrapped `PaginatedProducts`. `PaginatedProducts` is an async server component that calls `listProductsWithSort()` and renders `ProductPreview` cards plus a `Pagination` bar.

## Flow

**StoreTemplate:**
- **Props in**: `sortBy?: SortOptions`, `page?: string`, `countryCode: string`
- Defaults: `pageNumber = 1`, `sort = "created_at"`
- **Children**: `RefinementList` (sidebar) + `PaginatedProducts` (grid)

**PaginatedProducts:**
- **Props in**: `sortBy?: SortOptions`, `page: number`, `collectionId?: string`, `categoryId?: string`, `productsIds?: string[]`, `countryCode: string`
- **Data**: Calls `listProductsWithSort({ page, queryParams, sortBy, countryCode })` then `getRegion(countryCode)`. Query params include `limit: 12` plus optional `collection_id`, `category_id`, `id`, and `order` filters.
- **Output**: Responsive CSS grid of `ProductPreview` components. Renders `Pagination` when `totalPages > 1`.
- **Loading**: `SkeletonProductGrid` (8 products default) as Suspense fallback

## Integration
- `@lib/data/products` (`listProductsWithSort`) and `@lib/data/regions` (`getRegion`)
- `@modules/products/components/product-preview` for product cards
- `@modules/store/components/pagination` for page navigation
- `@modules/store/components/refinement-list` for sort controls
- `@modules/skeletons/templates/skeleton-product-grid` as Suspense fallback
- `StoreTemplate` consumed by `/store` page; `PaginatedProducts` also consumed by `categories/templates` and `collections/templates`
