# goya-merch-backend/apps/storefront/src/modules/order/components/

## Responsibility

Contains all leaf UI components used within the order module. Each component lives in its own folder with a flat `index.tsx` entry point. Components are either fully presentational (receiving props only) or client-side interactive (using `"use client"` directive) for stateful interactions like transfer actions and onboarding flow.

## Design

Standard Medusa storefront component pattern: stateless functional components where possible, `"use client"` only when React hooks (useState) or browser APIs are required. All components accept raw Medusa SDK types (`HttpTypes.StoreOrder`, `HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem`) directly as props, avoiding intermediate DTOs.

## Flow

- **Props in**: Each component receives a slice of an `HttpTypes.StoreOrder` object (or a line item with a `currencyCode` string). No component fetches its own data.
- **Events out**: `TransferActions` calls `acceptTransferRequest` / `declineTransferRequest` from `@lib/data/orders`; `OnboardingCta` calls `resetOnboardingState` from `@lib/data/onboarding`. All other components are pure render.
- **Composition**: Parent templates (in `../templates/`) compose these components, passing the full `StoreOrder` object down.

## Integration

- Parent module: `@modules/order`
- Consumed by templates: `@modules/order/templates/order-completed-template`, `@modules/order/templates/order-details-template`
- Consumed directly by routes: `TransferActions` and `TransferImage` are imported directly in the transfer route page
- Shared dependencies: `@modules/common/components/ui`, `@modules/common/components/divider`, `@modules/common/components/localized-client-link`
- Data dependencies: `@lib/data/orders`, `@lib/data/onboarding`, `@lib/util/money`, `@lib/constants`

## Children

- `help/` — Static "Need help?" section with contact links
- `item/` — Single line-item table row
- `items/` — Line items table with skeleton loading state
- `onboarding-cta/` — Onboarding completion call-to-action
- `order-details/` — Order metadata display (email, date, number, status)
- `order-summary/` — Financial breakdown (subtotal, discounts, shipping, taxes, total)
- `payment-details/` — Payment method and details display
- `shipping-details/` — Shipping address, contact, and method display
- `transfer-actions/` — Accept/decline transfer buttons with loading and error states
- `transfer-image/` — Decorative SVG illustration for the transfer page
