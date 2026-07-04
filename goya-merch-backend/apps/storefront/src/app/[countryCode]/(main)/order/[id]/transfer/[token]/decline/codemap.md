# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/transfer/[token]/decline/

## Responsibility

Executes an order ownership transfer declination. Calls the backend API to reject the transfer and displays the result (success or error message).

## Design

- **Async Server Component** — performs the side effect (API call) during server rendering.
- Calls `declineTransferRequest(id, token)` from `@lib/data/orders` and reads the `{ success, error }` response.
- Renders either a success confirmation ("Order transfer declined!") or an error message.
- No loading state or client-side interactivity; the mutation fires on page load.

## Flow

1. Extracts `id` and `token` from `params`.
2. Calls `declineTransferRequest(id, token)`.
3. If `success` is true, renders "Order transfer declined!" with the order ID.
4. If `success` is false, renders the error message.

## Integration

- Data: `@lib/data/orders` (`declineTransferRequest`).
- Components: `TransferImage` from `@modules/order/components/transfer-image`.
- UI primitives: `Heading`, `Text` from `@modules/common/components/ui`.
