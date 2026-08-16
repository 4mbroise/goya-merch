# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/

## Responsibility

Account area router. Uses parallel routes (`@dashboard` / `@login`) to conditionally render the dashboard for authenticated customers or the login/sign-up form for guests.

## Design

- **Async Server Component** layout with **Parallel Routes**: `dashboard` slot and `login` slot.
- On the server, calls `retrieveCustomer()` with a `.catch(() => null)`.
- If `customer` exists, renders `dashboard` slot; otherwise renders `login` slot.
- Wraps the selected slot in `AccountLayout` from `@modules/account/templates/account-layout`.
- Has a `loading.tsx` that shows a centered `<Spinner>`.

## Flow

1. Request hits `/fr/account`.
2. `AccountPageLayout` fetches the current customer.
3. Authenticated: renders `AccountLayout` > `@dashboard/page.tsx`.
4. Guest: renders `AccountLayout` > `@login/page.tsx`.
5. Child pages under `@dashboard/` are mapped by the Next.js parallel route convention.

## Integration

- Data: `@lib/data/customer` (`retrieveCustomer`).
- Template: `AccountLayout` from `@modules/account/templates/account-layout`.
- Slots: `@dashboard/` (customer dashboard pages), `@login/` (authentication page).
