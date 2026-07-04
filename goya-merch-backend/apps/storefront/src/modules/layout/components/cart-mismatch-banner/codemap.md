# goya-merch-backend/apps/storefront/src/modules/layout/components/cart-mismatch-banner/

## Responsibility

Client-side warning banner displayed when the current cart is not associated with the authenticated customer. Provides a one-click action to transfer the cart to the customer's account via `transferCart()`.

## Design

- **Early return guard**: If `customer` is falsy or `cart.customer_id` is already set, the component renders nothing (`return` without JSX).
- **Client component**: Declares `"use client"`; uses `useState` to track pending state and dynamic button label ("Transferring.." vs "Run transfer again").
- **Error recovery**: On transfer failure, the button text reverts and `isPending` resets so the user can retry.

## Flow

```
CartMismatchBanner({ customer, cart })
  ↓ guard: if !customer || cart.customer_id → return null
  ↓ render:
    orange warning bar with ExclamationCircleSolid icon
    "Something went wrong when we tried to transfer your cart"
    · (separator)
    Button { disabled: isPending, onClick: handleSubmit }
      → set isPending=true, actionText="Transferring.."
      → await transferCart()
      → on catch: reset actionText + isPending
```

## Integration

- Props: `customer: StoreCustomer`, `cart: StoreCart` — both from `@medusajs/types`
- Calls `transferCart()` from `@lib/data/customer` (no-arg, transfers current cart to logged-in customer)
- Uses `ExclamationCircleSolid` icon from `@medusajs/icons`, `Button` from `@modules/common/components/ui`
- Consumed by page layouts that have access to both customer and cart objects

