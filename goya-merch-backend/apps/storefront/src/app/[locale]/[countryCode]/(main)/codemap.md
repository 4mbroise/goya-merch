# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/

## Responsibility

Main store route group — the primary layout for all storefront pages. Renders the navigation bar, cart-mismatch banner, free-shipping price nudge, the page content, and the footer.

## Design

- **Route Group** `(main)` — excluded from URL; all storefront pages live under this group.
- **Async Server Component** layout: fetches customer, cart, and shipping options on every navigation; these are passed as props to `Nav`, `CartMismatchBanner`, and `FreeShippingPriceNudge`.
- The layout wraps `{children}` between `Nav` (top) and `Footer` (bottom).
- Has its own `not-found.tsx` for unmatched routes within the main store.

## Flow

1. For every page in this route group, `PageLayout` runs server-side.
2. Fetches `customer` and `cart` in parallel.
3. If cart exists, also fetches `shipping_options` via `listCartOptions()`.
4. Renders: `Nav` → (conditional `CartMismatchBanner` + `FreeShippingPriceNudge`) → `children` → `Footer`.

## Integration

- Data: `@lib/data/cart` (`listCartOptions`, `retrieveCart`), `@lib/data/customer` (`retrieveCustomer`).
- UI: `Nav` from `@modules/layout/templates/nav`, `Footer` from `@modules/layout/templates/footer`.
- Components: `CartMismatchBanner` (warns if cart region differs from URL region), `FreeShippingPriceNudge` (promotional popup).
- The root home page (`page.tsx`) renders `Hero` + `FeaturedProducts`.
