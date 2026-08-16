# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/

## Responsibility

The authenticated dashboard overview page. Shows the customer a summary of their account activity — recent orders and profile details.

## Design

- **Parallel Route slot** `@dashboard` — rendered only when the customer is authenticated (see parent `account/layout.tsx`).
- **Async Server Component**: fetches customer and orders in parallel; guards with `notFound()` if customer is missing.
- Delegates rendering to the `Overview` component from `@modules/account/components/overview`.
- Has its own `loading.tsx` with a centered spinner.

## Flow

1. `@dashboard/page.tsx` runs server-side.
2. Fetches `customer` via `retrieveCustomer()` and `orders` via `listOrders()`.
3. If no customer, calls `notFound()`.
4. Passes both to `<Overview customer={customer} orders={orders} />`.

## Integration

- Data: `@lib/data/customer` (`retrieveCustomer`), `@lib/data/orders` (`listOrders`).
- Component: `Overview` from `@modules/account/components/overview`.
- Child routes: `addresses/`, `orders/`, `profile/` extend the dashboard with specific sections.
