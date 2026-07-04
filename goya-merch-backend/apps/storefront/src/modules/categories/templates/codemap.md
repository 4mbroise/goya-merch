# goya-merch-backend/apps/storefront/src/modules/categories/templates/

## Responsibility
Composes the full category page layout: a `RefinementList` sidebar, breadcrumb parent links, category name/description, sub-category navigation, and a `Suspense`-wrapped `PaginatedProducts` grid.

## Design
Template composition pattern — orchestrates multiple feature components into a page-level layout. Uses `notFound()` from Next.js for missing categories. Recursively resolves parent categories for breadcrumb rendering.

## Flow
- **Props in**: `category: HttpTypes.StoreProductCategory`, `sortBy?: SortOptions`, `page?: string`, `countryCode: string`
- **Breadcrumb**: Walks `category.parent_category` recursively to build ancestor chain
- **Data**: `PaginatedProducts` (async server component) fetches products filtered by `categoryId`
- **Loading**: `SkeletonProductGrid` with `numberOfProducts` matching category size

## Integration
- `@modules/store/components/refinement-list` for sort controls
- `@modules/store/templates/paginated-products` for the product grid + pagination
- `@modules/skeletons/templates/skeleton-product-grid` as Suspense fallback
- `@modules/common/components/interactive-link` for sub-category links
- `@modules/common/components/localized-client-link` for breadcrumb links
