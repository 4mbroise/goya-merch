# goya-merch-backend/apps/storefront/src/modules/skeletons/templates/skeleton-related-products/

## Responsibility
Skeleton for the related products section on the product detail page.

## Design
Renders a title bar and two description bars above a 3-column grid of `SkeletonProductPreview` components (repeated 3x via `repeat()`). Uses `animate-pulse` on header elements.

## Integration
- `@lib/util/repeat`
- `@modules/skeletons/components/skeleton-product-preview`
- Used as `Suspense` fallback in the product detail page template
