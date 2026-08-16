# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/transfer/[token]/

## Responsibility

Order transfer request landing page. Displays information about a pending ownership transfer and provides Accept / Decline action buttons.

## Design

- **Async Server Component** with two dynamic segments: `[id]` (order ID) and `[token]` (transfer token).
- No data fetching — the page is purely informational, relying on the URL parameters.
- Renders a centered layout with `TransferImage` (illustration), heading showing the order ID, explanatory text, and `TransferActions` component which provides the accept/decline links.

## Flow

1. Extracts `id` and `token` from `params`.
2. Renders static informational text explaining the transfer request.
3. Renders `<TransferActions id={id} token={token} />` which links to `accept/` and `decline/` sub-pages.

## Integration

- Components: `TransferActions` from `@modules/order/components/transfer-actions`, `TransferImage` from `@modules/order/components/transfer-image`.
- UI primitives: `Heading`, `Text` from `@modules/common/components/ui`.
