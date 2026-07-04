# goya-merch-backend/apps/storefront/src/modules/skeletons/templates/skeleton-product-grid/

## Responsibility
Skeleton for the paginated product grid used across store, category, and collection listing pages.

## Design
Accepts `numberOfProducts` (default `8`) to control placeholder count. Renders a responsive CSS grid (`grid-cols-2 small:grid-cols-3 medium:grid-cols-4`) of `SkeletonProductPreview` components with `data-testid="products-list-loader"`.

## Integration
- `@lib/util/repeat`
- `@modules/skeletons/components/skeleton-product-preview`
- Used as `Suspense` fallback in `StoreTemplate`, `CategoryTemplate`, `CollectionTemplate`
