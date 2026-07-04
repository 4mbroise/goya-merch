# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-order-summary/

## Responsibility
Placeholder for the order summary sidebar (totals + checkout button).

## Design
Composes `SkeletonCartTotals` (with `header={false}`) and `SkeletonButton` in a single-column grid.

## Integration
- Composes `@modules/skeletons/components/skeleton-cart-totals` and `@modules/skeletons/components/skeleton-button`
- Consumed by `SkeletonCartPage` template
