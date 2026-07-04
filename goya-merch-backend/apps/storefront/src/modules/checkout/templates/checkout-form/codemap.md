# goya-merch-backend/apps/storefront/src/modules/checkout/templates/checkout-form/

## Responsibility

Top-level server component that orchestrates the multi-step checkout form. Fetches shipping and payment methods on the server, then composes the four step components vertically.

## Design

Async server component (Next.js 15 Server Component). Performs data fetching at request time: `listCartShippingMethods(cart.id)` and `listCartPaymentMethods(cart.region?.id)`. Renders a single-column grid composing `Addresses`, `Shipping`, `Payment`, and `Review` in order. Returns `null` early if `cart` is null or if shipping/payment method lists are unavailable. No client-side interactivity — all step state management is delegated to the individual step components (which read `?step=` search params and use server actions).

## Flow

Props in: `cart` (StoreCart | null), `customer` (StoreCustomer | null).
- Guards: returns `null` if `!cart` or `!shippingMethods || !paymentMethods`.
- Renders: `<div className="w-full grid grid-cols-1 gap-y-8">` containing step components in sequence.
- Each step component receives `cart` and relevant data; step visibility is controlled independently via `useSearchParams`.

## Integration

Data fetchers: `listCartShippingMethods` from `@lib/data/fulfillment`, `listCartPaymentMethods` from `@lib/data/payment`. Composes: `Addresses`, `Shipping`, `Payment`, `Review` from `@modules/checkout/components/`. Consumed by the checkout page route (e.g., `app/(main)/checkout/page.tsx`).
