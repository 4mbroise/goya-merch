# goya-merch-backend/apps/storefront/src/modules/account/components/overview/

## Responsibility
Account dashboard page showing a welcome message, profile completion percentage, saved address count, and a list of recent orders (up to 5). Desktop-only (hidden on small screens via `hidden small:block`).

## Design
Presentational component. State derived directly from props — no client hooks or data-fetching. Includes a local `getProfileCompletion` utility that scores the customer profile (email, name, phone, billing address) as a percentage out of 4 fields.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer | null`, `orders: HttpTypes.StoreOrder[] | null`.

**Sections**:
1. **Header**: Greeting with `customer.first_name` and signed-in email.
2. **Profile & Addresses stats**: Profile completion % (from `getProfileCompletion`), count of saved addresses.
3. **Recent orders**: Up to 5 orders listed as clickable rows showing date placed, order number, and total amount. Each row links to `/account/orders/details/${order.id}`. Empty state shows "No recent orders".

**`getProfileCompletion`** helper: Counts presence of `email`, `first_name && last_name`, `phone`, and a `is_default_billing` address. Returns `(count / 4) * 100`.

## Integration
- Used by: the `/account` (overview) route page.
- Dependencies: `Container` from `@modules/common/components/ui`, `LocalizedClientLink`, `ChevronDown` icon, `convertToLocale` from `@lib/util/money`.
