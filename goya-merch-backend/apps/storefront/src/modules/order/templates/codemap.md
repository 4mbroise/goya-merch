# goya-merch-backend/apps/storefront/src/modules/order/templates/

## Responsibility

Contains page-level template compositions that arrange order module components into full-page layouts for the order confirmation and order details routes. These templates are the sole bridge between route pages (which fetch data) and leaf components (which render data).

## Design

Two templates following distinct rendering strategies:

1. **`order-completed-template.tsx`** — Async server component (`export default async function`). Reads the `_medusa_onboarding` cookie from `next/headers` to conditionally render `OnboardingCta`. Composes `OrderDetails`, `Items`, `ShippingDetails`, `PaymentDetails`, `CartTotals` (from `@modules/common/components`), and `Help` in a vertical column layout.

2. **`order-details-template.tsx`** — Client component (`"use client"`) despite being primarily presentational, to support the `LocalizedClientLink` back-navigation element with `XMark` icon. Composes `OrderDetails` (with `showStatus`), `Items`, `ShippingDetails`, `OrderSummary`, and `Help`. Notably uses `OrderSummary` rather than `CartTotals`, providing a different financial breakdown than the confirmation page.

## Flow

**Props in**: Both templates accept `order: HttpTypes.StoreOrder`.  
**Events out**: `OrderCompletedTemplate` conditionally renders `OnboardingCta`, which triggers `resetOnboardingState` server action. `OrderDetailsTemplate` provides a back link to `/account/orders`.  
**Data calls**: Neither template fetches data — data is fetched by the route page and passed as props.

## Integration

- Consumed by route pages:
  - `[countryCode]/(main)/order/[id]/confirmed/page.tsx` → `OrderCompletedTemplate`
  - `[countryCode]/(main)/account/@dashboard/orders/details/[id]/page.tsx` → `OrderDetailsTemplate`
- Child components: `Help`, `Items`, `OrderDetails`, `OrderSummary`, `ShippingDetails`, `PaymentDetails`, `OnboardingCta`, plus common components `CartTotals`, `LocalizedClientLink`
- Shared dependencies: `@modules/common/components/ui` (Heading), `@medusajs/types`, `@medusajs/icons` (XMark)

## Children

- `order-completed-template.tsx` — Post-checkout order confirmation layout
- `order-details-template.tsx` — Authenticated order detail layout
