# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-product-preview/

## Responsibility
Placeholder for a single product preview card in grid layouts (image thumbnail + title + price).

## Design
Renders a `Container` with `aspect-[9/16]` for the image region and two text bars (2/5 and 1/5 width) for title and price. Uses `animate-pulse`.

## Integration
- `@modules/common/components/ui` (`Container`)
- Consumed by `SkeletonProductGrid` and `SkeletonRelatedProducts` templates
