# goya-merch-backend/apps/storefront/src/modules/checkout/components/payment/

## Responsibility

Third step in the checkout flow. Handles payment method selection, Stripe card session initiation, and progression to the review step. Conditionally renders the available payment methods as a radio group.

## Design

Step container with URL-driven open/closed state (`?step=payment`). Uses a `RadioGroup` from Headless UI to list available payment providers. Distinguishes between Stripe-like providers (which need a `CardElement` via `StripeCardContainer`) and other/manual providers (rendered as `PaymentContainer`). Manages local state for `selectedPaymentMethod`, `cardBrand`, `cardComplete`, `isLoading`, and `error`. The `setPaymentMethod` function initiates a payment session server-side for Stripe providers. Handles gift-card-only carts (when `total === 0` and gift cards exist) as a special case bypassing payment method selection.

## Flow

Props in: `cart` (StoreCart), `availablePaymentMethods` (Array<{id: string}>).
- `activeSession` derived from `cart.payment_collection.payment_sessions` with `status === "pending"`.
- `setPaymentMethod`: sets selected provider and calls `initiatePaymentSession` for Stripe-like providers.
- `handleSubmit`: ensures an active session exists, then navigates to `?step=review`. For Stripe providers without an active session, it stays to collect card details first.
- Button text changes contextually ("Enter card details" vs "Continue to review").
- Summary (collapsed) view shows selected payment method title, icon, and card brand.

## Integration

Data action: `initiatePaymentSession` from `@lib/data/cart`. Constants: `isStripeLike`, `paymentInfoMap` from `@lib/constants`. Composes `PaymentContainer`, `StripeCardContainer` (from `payment-container`), `ErrorMessage`, and common UI primitives. Consumed by `CheckoutForm` template.
