# goya-merch-backend/apps/storefront/src/modules/skeletons/templates/skeleton-cart-page/

## Responsibility
Full-page skeleton for the cart page, matching the two-column layout (cart items table + order summary sidebar).

## Design
Composes `SkeletonCartItem` (repeated 4x via `repeat()`), `SkeletonOrderSummary`, and `SkeletonCodeForm` inside a responsive grid (`1fr` / `1fr_360px`). Includes skeleton table header cells.

## Integration
- `@lib/util/repeat`
- `@modules/skeletons/components/skeleton-cart-item`, `skeleton-code-form`, `skeleton-order-summary`
- `@modules/common/components/ui` (`Table`)
