# goya-merch-backend/apps/storefront/src/modules/order/components/transfer-actions/

## Responsibility

Provides the interactive UI for a guest order transfer request. Lets the current order owner accept or decline the transfer, with loading, success, and error states.

## Design

Client component (`"use client"`) using `useState` to track two independent transfer statuses: `accept` and `decline` (each `"pending" | "success" | "error" | null`). Buttons are disabled while either action is pending. On success, the button group is replaced by a green confirmation message. Error messages are rendered in red below the action area. Data mutations are handled via `acceptTransferRequest` and `declineTransferRequest` from `@lib/data/orders`, both of which call the Medusa JS SDK's store order transfer endpoints.

## Flow

**Props in**: `id` (order ID string), `token` (transfer token string).  
**Events out**: `onClick` handlers call `acceptTransferRequest(id, token)` or `declineTransferRequest(id, token)`.  
**Data calls**: `@lib/data/orders` — `acceptTransferRequest`, `declineTransferRequest`.

## Integration

- Consumed by: `@modules/order/templates/...` — imported directly in `order/[id]/transfer/[token]/page.tsx` (not via a template)
- Dependencies: `@modules/common/components/ui` (Button, Text)
- Data layer: `@lib/data/orders`
- States: idle (buttons visible), pending (buttons disabled with loading indicator), success (green confirmation text), error (red error text with buttons re-enabled for retry)
