# goya-merch-backend/apps/storefront/src/modules/checkout/components/payment-wrapper/

## Responsibility

Conditionally wraps the checkout children in a Stripe `Elements` provider when the active payment session uses a Stripe-like provider. Exposes `StripeContext` so descendent components can check whether Stripe is initialized.

## Design

Wrapper/Adapter pattern (two files). `index.tsx` — `PaymentWrapper`: checks the cart's active payment session; if `isStripeLike(provider_id)` and `stripePromise` is available, renders `StripeWrapper` around children; otherwise renders children directly (no Stripe). Stripe key is loaded from `NEXT_PUBLIC_STRIPE_KEY` or `NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY`, with optional `stripeAccount` for Connect accounts.

`stripe-wrapper.tsx` — `StripeWrapper`: initializes `StripeContext.Provider` (boolean `true`) and wraps children in Stripe's `<Elements>` with the `clientSecret` from the payment session. Throws descriptive errors if `stripeKey`, `stripePromise`, or `clientSecret` are missing. `StripeContext` is exported for consumption by `StripeCardContainer`.

## Flow

- `PaymentWrapper` reads `cart.payment_collection.payment_sessions` for a pending session.
- If Stripe-like: creates `stripePromise` via `loadStripe`, passes it + `paymentSession` to `StripeWrapper`.
- `StripeWrapper` validates required values, renders `<StripeContext.Provider value={true}><Elements options={{clientSecret}} stripe={stripePromise}>{children}</Elements></StripeContext.Provider>`.
- If not Stripe-like: renders a plain `<div>{children}</div>`.

## Integration

Stripe: `loadStripe` from `@stripe/stripe-js`, `Elements` from `@stripe/react-stripe-js`. Constants: `isStripeLike` from `@lib/constants`. Consumed by the checkout page layout to wrap the entire `CheckoutForm` + `CheckoutSummary` subtree.
