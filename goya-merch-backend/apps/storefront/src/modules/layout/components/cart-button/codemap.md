# goya-merch-backend/apps/storefront/src/modules/layout/components/cart-button/

## Responsibility

Minimal async server component that fetches the current cart from the Medusa API and delegates rendering to `CartDropdown`. Acts as a data-fetching boundary so `CartDropdown` remains a pure presentational client component that receives the cart as a prop.

## Design

- **Server component**: No `"use client"` directive — data fetching happens on the server; the result is passed as props to the client child.
- **Error-boundary pattern**: `retrieveCart()` is wrapped with `.catch(() => null)` so a failed fetch does not crash the header; `CartDropdown` receives `null` and renders the empty state.

## Flow

```
async CartButton
  ↓ retrieveCart()
  ↓ (cart | null)
CartDropdown({ cart })
```

## Integration

- Calls `retrieveCart` from `@lib/data/cart`
- Renders `CartDropdown` from `../cart-dropdown`
- Consumed by `Nav` template, where it is wrapped in `<Suspense>` with a "Cart (0)" fallback

