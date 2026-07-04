# goya-merch-backend/apps/storefront/src/modules/shipping/components/free-shipping-price-nudge/

## Responsibility
Renders a progress indicator showing the customer how close they are to unlocking free shipping, with two visual variants: an inline banner and a fixed-position popup.

## Design
Client Component (`"use client"`) — reads shipping option price rules for `item_total`-based conditions and computes threshold progress. Two internal sub-components: `FreeShippingInline` (banner) and `FreeShippingPopup` (dismissable fixed overlay). The popup auto-hides when the target is reached or when manually closed via `useState`.

## Flow
- **Props in**: `variant: "popup" | "inline"`, `cart: StoreCart`, `shippingOptions: StoreCartShippingOption[]`
- **Logic**: Filters shipping options for those with a calculated price and an `item_total` price rule, then computes `computeTarget()` based on the operator (`gt`, `gte`, `lt`, `lte`, or default equality). Finds the first zero-amount price as the free-shipping target.
- **Events**: Popup has an `XMark` button that sets `isClosed` state to dismiss the nudge.
- **Output**: Percentage bar, monetary remaining amount, and status text.

## Integration
- `@lib/util/money` (`convertToLocale`) for currency formatting
- `@medusajs/icons` (`CheckCircleSolid`, `XMark`)
- `@modules/common/components/ui` (`Button`, `clx`)
- `@modules/common/components/localized-client-link` for cart/store links in popup
- Consumed by cart layout or page template
