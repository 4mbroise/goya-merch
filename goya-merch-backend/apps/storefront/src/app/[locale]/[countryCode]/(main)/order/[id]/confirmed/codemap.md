# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/confirmed/

## Responsibility

Order confirmation page displayed after a successful purchase. Shows the order details and a success message.

## Design

- **Async Server Component**: fetches the order by ID via `retrieveOrder(params.id)` with `.catch(() => null)`.
- Calls `notFound()` if the order is not retrievable.
- Delegates to `OrderCompletedTemplate` from `@modules/order/templates/order-completed-template`.
- Has a `loading.tsx` that shows `SkeletonOrderConfirmed`.

## Flow

1. Extracts `id` from `params` (the order ID from the URL path).
2. Calls `retrieveOrder()`.
3. If order is null, calls `notFound()`.
4. Renders `<OrderCompletedTemplate order={order} />`.

## Integration

- Data: `@lib/data/orders` (`retrieveOrder`).
- Template: `OrderCompletedTemplate` from `@modules/order/templates/order-completed-template`.
- Loading: `SkeletonOrderConfirmed` from `@modules/skeletons/templates/skeleton-order-confirmed`.
