# goya-merch-backend/apps/storefront/src/modules/checkout/components/payment-container/

## Responsibility

Renders a single payment method option as a Headless UI `RadioGroup.Option`. Provides the baseline container; also exports `StripeCardContainer` which extends it with an embedded Stripe `CardElement` for card entry.

## Design

Presentational leaf with a paired strategy extension. `PaymentContainer` renders the radio button, title, icon, and optional children (e.g., manual-test badge). `StripeCardContainer` wraps `PaymentContainer` and injects a `CardElement` from `@stripe/react-stripe-js` as children when its option is selected. It reads `StripeContext` from `payment-wrapper` to check Stripe readiness — shows a `SkeletonCardDetails` placeholder while Stripe is loading. CardElement `onChange` callbacks propagate `cardBrand`, `error`, and `cardComplete` to the parent `Payment` component.

## Flow

`PaymentContainer` props: `paymentProviderId`, `selectedPaymentOptionId`, `paymentInfoMap`, optional `disabled`, `children`.
- Highlights border via `border-ui-border-interactive` when selected.
- Shows `PaymentTest` badge in dev mode for manual providers.

`StripeCardContainer` additional props: `setCardBrand`, `setError`, `setCardComplete`.
- Conditionally renders the card element only when `selectedPaymentOptionId === paymentProviderId`.
- Card style options memoized for dark/light theme alignment and Tailwind-like class overrides.

## Integration

Stripe hooks: `CardElement` from `@stripe/react-stripe-js`. Context: `StripeContext` from `../payment-wrapper/stripe-wrapper`. Icons and metadata from `paymentInfoMap` constant (`@lib/constants`). Consumed by `Payment` component.
