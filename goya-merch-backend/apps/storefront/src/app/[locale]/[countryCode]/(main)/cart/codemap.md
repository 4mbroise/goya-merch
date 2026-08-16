# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/cart/

## Responsibility

Shopping cart page. Displays the current cart contents, line items, totals, and a checkout button.

## Design

- **Async Server Component**: fetches cart and customer data; calls `notFound()` if cart retrieval throws.
- Delegates to `CartTemplate` from `@modules/cart/templates`.
- Has a dedicated `loading.tsx` (`SkeletonCartPage`) and a custom `not-found.tsx` with a cart-specific message ("Clear your cookies and try again").

## Flow

1. Calls `retrieveCart()` (with `.catch()` that logs error and calls `notFound()`).
2. Calls `retrieveCustomer()`.
3. Passes both to `<CartTemplate cart={cart} customer={customer} />`.

## Integration

- Data: `@lib/data/cart` (`retrieveCart`), `@lib/data/customer` (`retrieveCustomer`).
- Template: `CartTemplate` from `@modules/cart/templates`.
- Loading: `SkeletonCartPage` from `@modules/skeletons/templates/skeleton-cart-page`.
