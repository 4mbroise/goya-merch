# goya-merch-backend/apps/storefront/src/modules/skeletons/templates/skeleton-order-confirmed/

## Responsibility
Full-page skeleton for the order confirmed page, matching the centered card layout with header, items, and information sections.

## Design
Composes `SkeletonOrderConfirmedHeader`, `SkeletonOrderItems`, and `SkeletonOrderInformation` inside a white card (`max-w-4xl`) on a gray background with `animate-pulse`.

## Integration
- `@modules/skeletons/components/skeleton-order-confirmed-header`, `skeleton-order-items`, `skeleton-order-information`
