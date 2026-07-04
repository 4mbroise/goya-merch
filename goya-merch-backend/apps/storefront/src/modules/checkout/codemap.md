# goya-merch-backend/apps/storefront/src/modules/checkout/

## Responsibility

Implements the full e-commerce checkout experience: address collection, shipping method selection, payment method selection with Stripe integration, discount code management, and order placement. Uses a URL-driven multi-step flow with server actions for data mutation.

## Design

Feature module composed of `components/` (leaf presentational components and step containers) and `templates/` (server-side composition templates). The checkout uses a **state machine pattern** driven by the `?step=` query parameter:
- `?step=address` → shipping/billing address form
- `?step=delivery` → shipping method selection
- `?step=payment` → payment method selection
- `?step=review` → order review and placement

Each step container is a collapsible section that shows either an edit form or a read-only summary. Navigation between steps uses `useRouter.push` with query string updates. Data mutations use **server actions** (React 19 `useActionState` for addresses, direct calls for shipping/payment). Stripe integration follows a **wrapper/adapter pattern** via `PaymentWrapper`/`StripeWrapper`.

## Flow

1. `CheckoutForm` (async server component) fetches shipping and payment method options, then renders step containers in sequence.
2. `Addresses` step: form driven by `setAddresses` server action; billing address can be toggled same-as-shipping.
3. `Shipping` step: lists delivery options (shipping + pickup), calculated prices fetched on mount, selection persisted via `setShippingMethod`.
4. `Payment` step: radio group of payment providers; Stripe providers show `CardElement`; session initiated via `initiatePaymentSession`.
5. `Review` step: shows terms acknowledgement and `PaymentButton` which dispatches to Stripe `confirmCardPayment` or direct `placeOrder`.
6. `CheckoutSummary` sidebar shows cart totals, line items preview, and discount code management.
7. `PaymentWrapper` conditionally wraps the entire checkout in Stripe `Elements` provider.

## Integration

- **Data access**: `@lib/data/cart` (setAddresses, setShippingMethod, initiatePaymentSession, applyPromotions, placeOrder), `@lib/data/fulfillment` (listCartShippingMethods, calculatePriceForShippingOption), `@lib/data/payment` (listCartPaymentMethods)
- **Constants**: `@lib/constants` (isStripeLike, isManual, paymentInfoMap)
- **Stripe**: `@stripe/react-stripe-js`, `@stripe/stripe-js`
- **Common UI**: `@modules/common/components/*` (Input, Button, Radio, Checkbox, NativeSelect, ui primitives, cart-totals)
- **Consumed by**: checkout page route under `app/(main)/checkout/`

## Children

- `components/` — 15 feature-based UI components
- `templates/` — 2 composition templates (checkout-form, checkout-summary)
