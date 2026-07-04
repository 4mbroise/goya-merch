# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-order-information/

## Responsibility
Placeholder for the order information section on the order confirmed page (shipping address, contact, payment details, totals).

## Design
Composes `SkeletonCartTotals` with additional address/contact placeholder fields. Two-column grid layout on large screens with label bars and text-width placeholders for shipping details, contact info, and payment method.

## Integration
- Composes `@modules/skeletons/components/skeleton-cart-totals`
- Consumed by `SkeletonOrderConfirmed` template
