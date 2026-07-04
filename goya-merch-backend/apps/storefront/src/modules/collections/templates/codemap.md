# goya-merch-backend/apps/storefront/src/modules/collections/templates/

## Responsibility
Composes the full collection page layout: a `RefinementList` sidebar, collection title, and a `Suspense`-wrapped `PaginatedProducts` grid.

## Design
Template composition pattern — structurally identical to `CategoryTemplate` but simpler (no breadcrumbs, no sub-categories). Default sort is `created_at`.

## Flow
- **Props in**: `sortBy?: SortOptions`, `collection: HttpTypes.StoreCollection`, `page?: string`, `countryCode: string`
- **Data**: `PaginatedProducts` fetches products filtered by `collectionId`
- **Loading**: `SkeletonProductGrid` with `numberOfProducts` matching collection size

## Integration
- `@modules/store/components/refinement-list` for sort controls
- `@modules/store/templates/paginated-products` for the product grid + pagination
- `@modules/skeletons/templates/skeleton-product-grid` as Suspense fallback
