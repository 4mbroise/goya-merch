# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/orders/

## Responsibility

Orders listing page showing the customer's order history. Displays an order overview and an order transfer request form.

## Design

- **Async Server Component**: fetches all orders via `listOrders()`; calls `notFound()` if the list is falsy.
- Renders `OrderOverview` with the orders array and a `TransferRequestForm` separated by a divider.

## Flow

1. Calls `listOrders()` (no region parameter — uses the customer's cart or token).
2. If no orders returned, calls `notFound()`.
3. Renders heading, description, `<OrderOverview orders={orders} />`, divider, and `<TransferRequestForm />`.

## Integration

- Data: `@lib/data/orders` (`listOrders`).
- Components: `OrderOverview` from `@modules/account/components/order-overview`, `TransferRequestForm` from `@modules/account/components/transfer-request-form`, `Divider` from `@modules/common/components/divider`.
