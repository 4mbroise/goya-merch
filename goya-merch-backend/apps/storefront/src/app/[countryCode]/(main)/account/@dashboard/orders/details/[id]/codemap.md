# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/orders/details/[id]/

## Responsibility

Single order detail page within the account dashboard. Displays full order information — items, pricing, shipping, and payment status — for a specific order ID.

## Design

- **Async Server Component** with dynamic segment `[id]` representing the Medusa order ID.
- Fetches the order via `retrieveOrder(params.id)` with a `.catch(() => null)`.
- Calls `notFound()` if the order is not found.
- Generates dynamic metadata (`title: "Order #<display_id>"`).
- Delegates rendering to `OrderDetailsTemplate` from `@modules/order/templates/order-details-template`.

## Flow

1. Extracts `id` from `params` (e.g. `/fr/account/orders/details/order_123`).
2. Calls `retrieveOrder(id)`.
3. If order is falsy, calls `notFound()`.
4. Renders `<OrderDetailsTemplate order={order} />`.

## Integration

- Data: `@lib/data/orders` (`retrieveOrder`).
- Template: `OrderDetailsTemplate` from `@modules/order/templates/order-details-template`.
