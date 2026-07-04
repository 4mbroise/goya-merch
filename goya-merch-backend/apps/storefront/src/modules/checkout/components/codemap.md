# goya-merch-backend/apps/storefront/src/modules/checkout/components/

## Responsibility

Contains all presentational and container components that implement the multi-step checkout flow: address collection, shipping method selection, payment method selection with Stripe integration, order review, and discount code management.

## Design

Feature-based leaf components, each in its own folder with a single `index.tsx`. Components follow two patterns:
- **Step containers** (`addresses/`, `shipping/`, `payment/`, `review/`): manage URL-driven open/closed state via `?step=` search param, provide form submission, and compose leaf components. Each step container renders a collapsible section with edit/summary views.
- **Presentational leaf components** (`address-select/`, `billing_address/`, `country-select/`, `discount-code/`, `error-message/`, `payment-button/`, `payment-container/`, `payment-test/`, `payment-wrapper/`, `shipping-address/`, `submit-button/`): focused UI with minimal state, used by step containers.
- **Strategy pattern** in `payment-button/`: dispatches to Stripe or manual payment implementation based on provider ID.
- **Wrapper/Adapter** in `payment-wrapper/`: conditionally wraps children in Stripe `Elements` provider, exposing `StripeContext`.

## Flow

Data flows from `CheckoutForm` (server component) into step containers as props. Step containers read `?step=` via `useSearchParams`, call server actions (`setAddresses`, `setShippingMethod`, `initiatePaymentSession`, `placeOrder`) from `@lib/data/cart`, and manage their own open/closed/edit state. Navigation between steps uses `useRouter.push` with `?step=` query strings. `PaymentWrapper` wraps the entire checkout subtree to provide Stripe `Elements` context when needed.

## Integration

Data access: `@lib/data/cart` (setAddresses, setShippingMethod, initiatePaymentSession, applyPromotions, placeOrder), `@lib/data/fulfillment` (calculatePriceForShippingOption), `@lib/data/payment` (listCartPaymentMethods). Constants: `@lib/constants` (isStripeLike, isManual, paymentInfoMap). Stripe: `@stripe/react-stripe-js`, `@stripe/stripe-js`. Common components: `@modules/common/components/*` (Input, Button, Radio, Checkbox, NativeSelect, ui primitives, cart-totals). Consumed by `templates/checkout-form/` and `templates/checkout-summary/`.

## Children

- `address-select/` — Saved-address listbox picker
- `addresses/` — Shipping/billing address step container
- `billing_address/` — Billing address form fields
- `country-select/` — Region-based country dropdown
- `discount-code/` — Promotion code management
- `error-message/` — Conditional error display
- `payment/` — Payment method selection step container
- `payment-button/` — Place-order button (Stripe/manual strategy)
- `payment-container/` — Payment method radio option + Stripe CardElement
- `payment-test/` — Dev-mode testing badge
- `payment-wrapper/` — Conditional Stripe Elements provider
- `review/` — Terms + place order step container
- `shipping/` — Shipping method selection step container
- `shipping-address/` — Shipping address form with saved-address fill
- `submit-button/` — Form submit button with pending state
