# goya-merch-backend/apps/storefront/src/modules/order/

## Responsibility

Root module for all order-related UI in the storefront. Covers order confirmation (post-checkout), authenticated order detail viewing from customer accounts, and the guest-to-customer order transfer flow.

## Design

Two sub-directories follow the modular architecture: `components/` (leaf presentational components in individual folders) and `templates/` (page-level compositions that assemble components into full-page layouts). The module does not contain its own data-access layer — it imports from `@lib/data/orders` and `@lib/data/onboarding`.

## Flow

1. **Order Confirmation**: `order/[id]/confirmed/page.tsx` calls `retrieveOrder(id)`, passes the `StoreOrder` to `OrderCompletedTemplate`, which composes `OrderDetails`, `Items`, `ShippingDetails`, `PaymentDetails`, `CartTotals`, and `Help`. An optional `OnboardingCta` renders when the `_medusa_onboarding` cookie is present.
2. **Order Details**: `account/@dashboard/orders/details/[id]/page.tsx` calls `retrieveOrder(id)`, passes the order to `OrderDetailsTemplate`, which renders `OrderDetails`, `Items`, `ShippingDetails`, `OrderSummary`, and `Help`.
3. **Order Transfer**: `order/[id]/transfer/[token]/page.tsx` renders `TransferImage` (decorative SVG) and `TransferActions` (accept/decline buttons). The accept/decline subpages render only `TransferImage`.

## Integration

- **Data layer**: `@lib/data/orders` — `retrieveOrder`, `listOrders`, `createTransferRequest`, `acceptTransferRequest`, `declineTransferRequest`
- **Data layer**: `@lib/data/onboarding` — `resetOnboardingState` (consumed by `OnboardingCta`)
- **Common components**: `@modules/common/components/ui` (Heading, Text, Button, Container, Table), `@modules/common/components/cart-totals`, `@modules/common/components/divider`, `@modules/common/components/localized-client-link`, `@modules/common/components/line-item-options`, `@modules/common/components/line-item-price`, `@modules/common/components/line-item-unit-price`, `@modules/products/components/thumbnail`
- **Utilities**: `@lib/util/money` (`convertToLocale`), `@lib/util/repeat`, `@lib/constants` (`paymentInfoMap`, `isStripeLike`)
- **App routes**:
  - `[countryCode]/(main)/order/[id]/confirmed/page.tsx` — consumption point for `OrderCompletedTemplate`
  - `[countryCode]/(main)/account/@dashboard/orders/details/[id]/page.tsx` — consumption point for `OrderDetailsTemplate`
  - `[countryCode]/(main)/order/[id]/transfer/[token]/page.tsx` — consumption point for `TransferActions` and `TransferImage`
  - `[countryCode]/(main)/order/[id]/transfer/[token]/accept/page.tsx` — consumption point for `TransferImage`
  - `[countryCode]/(main)/order/[id]/transfer/[token]/decline/page.tsx` — consumption point for `TransferImage`

## Children

- `components/` — 10 leaf presentational components
- `templates/` — 2 page-level template compositions
