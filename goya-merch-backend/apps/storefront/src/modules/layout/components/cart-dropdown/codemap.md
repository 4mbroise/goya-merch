# goya-merch-backend/apps/storefront/src/modules/layout/components/cart-dropdown/

## Responsibility

Client-side interactive cart preview panel triggered by hover on the header "Cart (N)" link. Displays a sorted list of line items with thumbnails, titles, variant options, quantities, prices, and a "Remove" button per item, plus a subtotal summary and a "Go to cart" CTA.

## Design

- **Headless UI Popover**: Wraps the dropdown in `Popover`, `PopoverButton`, `PopoverPanel`, and `Transition` for accessible show/hide with enter/leave animations.
- **Hover + timer interaction**: On mouse enter, the panel opens immediately (cancelling any pending auto-close timer). On mouse leave, the panel closes. An auto-open timer (5 s) fires when cart item count changes (detected via `useRef` diff), but only when the user is not on the `/cart` page.
- **Empty state**: When `cart` is null or has no items, renders a centered empty-shopping-bag message with an "Explore products" button linking to `/store`.
- **Client boundary**: Declares `"use client"`; receives cart as a prop ready-shaped from `CartButton`.

## Flow

```
CartDropdown({ cart })
  ↓ compute totalItems (reduce quantities)
  ↓ compute subtotal
  ↓ onMouseEnter → openAndCancel (clear timer + open)
  ↓ onMouseLeave → close
  ↓ useEffect [totalItems] → timedOpen (if not on /cart)
  ↓
  render:
    PopoverButton → Link to /cart ("Cart (N)")
    PopoverPanel (conditional Transition):
      if items exist:
        sorted item list (newest first)
          each: Thumbnail, title, LineItemOptions, qty, LineItemPrice, DeleteButton
        → Subtotal (convertToLocale) + "Go to cart" Button
      else:
        "Your shopping bag is empty." + "Explore products" Button to /store
```

## Integration

- Props: `cart?: HttpTypes.StoreCart | null`
- Uses `usePathname` from `next/navigation` to suppress auto-open on `/cart`
- Calls `convertToLocale({ amount, currency_code })` from `@lib/util/money`
- Composes `Thumbnail` from `@modules/products/components/thumbnail`, `LineItemOptions`, `LineItemPrice`, `DeleteButton`, `LocalizedClientLink`, and `Button` from common UI
- Consumed by `CartButton` (server component wrapper)

