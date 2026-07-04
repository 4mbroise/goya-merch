# goya-merch-backend/apps/storefront/src/modules/checkout/components/review/

## Responsibility

Fourth and final step in the checkout flow. Displays the terms acceptance text and renders the `PaymentButton` to place the order.

## Design

Step container with URL-driven open state (`?step=review`). Checks that all previous steps are completed (`shipping_address`, `shipping_methods`, `payment_collection` or gift card). If prerequisites are met and the step is open, shows the terms of use/return policy acknowledgment and the `PaymentButton`. Includes a `paidByGiftcard` short-circuit for zero-total carts.

## Flow

Props in: `cart` (StoreCart).
- `isOpen` derived from `searchParams.get("step") === "review"`.
- `previousStepsCompleted` checks `cart.shipping_address`, `shipping_methods.length > 0`, and either `payment_collection` exists or `paidByGiftcard`.
- Renders terms text and `<PaymentButton cart={cart} data-testid="submit-order-button" />` when both conditions are met.
- The Review heading dims (`opacity-50 pointer-events-none`) when the step is not open.

## Integration

Composes `PaymentButton` from `../payment-button`. Consumed by `CheckoutForm` template. No direct data calls — all ordering logic is delegated to `PaymentButton`.
