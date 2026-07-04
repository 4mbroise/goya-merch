# goya-merch-backend/apps/storefront/src/modules/checkout/components/payment-test/

## Responsibility

Renders a small "For testing purposes only" badge. Used as a visual indicator in development mode for manual payment methods.

## Design

Minimal presentational component. Wraps the `Badge` common component with `color="orange"` and an optional `className` prop for responsive visibility (shown as block on small screens, inline on larger via parent CSS classes).

## Flow

Props in: optional `className`. Renders a static badge with a bold "Attention:" prefix. No state, no callbacks.

## Integration

Imports `Badge` from `@modules/common/components/ui`. Consumed by `PaymentContainer`, conditionally rendered when `process.env.NODE_ENV === "development"` and the payment provider is manual (`isManual`).
