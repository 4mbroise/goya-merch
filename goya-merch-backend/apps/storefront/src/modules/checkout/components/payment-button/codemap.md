# goya-merch-backend/apps/storefront/src/modules/checkout/components/payment-button/

## Responsibility

Renders the final "Place order" button in the review step. Dispatches to the correct payment implementation — Stripe `confirmCardPayment` or a manual test submission — based on the active payment session's provider ID.

## Design

Strategy pattern. The outer `PaymentButton` component uses a `switch(true)` to delegate to either `StripePaymentButton` or `ManualTestPaymentButton` depending on `isStripeLike`/`isManual` checks against `paymentSession?.provider_id`. Each inner implementation calls `placeOrder` from `@lib/data/cart` after the payment flow completes. `StripePaymentButton` uses `useStripe`/`useElements` hooks from `@stripe/react-stripe-js`, retrieves the card element, and calls `stripe.confirmCardPayment` with the client secret and billing details from the cart. `ManualTestPaymentButton` immediately calls `onPaymentCompleted` -> `placeOrder`.

## Flow

Props in: `cart` (StoreCart), `data-testid`.
- Computes `notReady` if shipping address, billing address, email, or shipping method are missing.
- Stripe path: validates Stripe readiness, calls `confirmCardPayment` with `payment_method.card`, `billing_details` (name, address, email, phone). On success or terminal status (`requires_capture`/`succeeded`), invokes `placeOrder`.
- Manual path: calls `placeOrder` directly on button click.
- Both paths display local `errorMessage` via `ErrorMessage` and manage `submitting` loading state.

## Integration

Data action: `placeOrder` from `@lib/data/cart`. Constants: `isStripeLike`, `isManual` from `@lib/constants`. Stripe hooks from `@stripe/react-stripe-js` (requires `StripeWrapper` ancestor). Consumed by `Review` component.
