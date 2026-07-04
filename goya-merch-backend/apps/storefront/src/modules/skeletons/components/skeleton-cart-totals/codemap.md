# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-cart-totals/

## Responsibility
Placeholder for the cart totals summary section (subtotal, shipping, tax, total).

## Design
Accepts an optional `header?: boolean` prop (default `true`) to toggle a header bar. Renders four rows of label + value placeholders, a dashed border divider, and a final total row with larger height.

## Integration
Consumed by `SkeletonOrderSummary`, `SkeletonOrderInformation`, and as a direct loading fallback in cart-related pages.
