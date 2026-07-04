# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/transfer/[token]/accept/

## Responsibility

Executes an order ownership transfer acceptance. Calls the backend API to approve the transfer and displays the result (success or error message).

## Design

- **Async Server Component** — performs the side effect (API call) during server rendering.
- Calls `acceptTransferRequest(id, token)` from `@lib/data/orders` and reads the `{ success, error }` response.
- Renders either a success confirmation or an error message.
- No loading state or client-side interactivity; the mutation fires on page load.

## Flow

1. Extracts `id` and `token` from `params`.
2. Calls `acceptTransferRequest(id, token)`.
3. If `success` is true, renders "Order transferred!" with the order ID.
4. If `success` is false, renders the error message.

## Integration

- Data: `@lib/data/orders` (`acceptTransferRequest`).
- Components: `TransferImage` from `@modules/order/components/transfer-image`.
- UI primitives: `Heading`, `Text` from `@modules/common/components/ui`.
