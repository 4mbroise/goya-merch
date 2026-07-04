# goya-merch-backend/apps/storefront/src/app/[countryCode]/(checkout)/checkout/

## Responsibility

Main checkout page where the customer completes their purchase. Renders the payment wrapper, checkout form, and order summary side-by-side.

## Design

- **Async Server Component** — fetches cart and customer data on the server, then renders client-interactive form components.
- Two-column layout: `CheckoutForm` (left) and `CheckoutSummary` (right) on small—breakpoint `grid-cols-[1fr_416px]`.
- Returns `notFound()` if no cart exists (prevents checkout with an empty/missing cart).

## Flow

1. Calls `retrieveCart()` from `@lib/data/cart`.
2. If cart is `null`, calls `notFound()`.
3. Calls `retrieveCustomer()` from `@lib/data/customer` (returns `null` for anonymous users, which `CheckoutForm` handles).
4. Renders `<PaymentWrapper>` wrapping `<CheckoutForm>` and `<CheckoutSummary>`.

## Integration

- Data: `@lib/data/cart` (`retrieveCart`), `@lib/data/customer` (`retrieveCustomer`).
- Template: `CheckoutForm` from `@modules/checkout/templates/checkout-form`, `CheckoutSummary` from `@modules/checkout/templates/checkout-summary`.
- Wrapper: `PaymentWrapper` from `@modules/checkout/components/payment-wrapper` (handles payment session initialisation).
