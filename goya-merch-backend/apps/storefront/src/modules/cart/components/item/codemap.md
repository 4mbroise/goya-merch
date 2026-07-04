# goya-merch-backend/apps/storefront/src/modules/cart/components/item/

## Responsibility
Renders a single cart line-item row within a `Table.Row`. Displays product thumbnail (linked to the product page), title, variant options, quantity selector with delete, unit price, and line total. Handles quantity update calls to the server and surfaces errors inline.

## Design
Interactive presentational component (`"use client"`). Accepts a `type` prop (`"full"` | `"preview"`) that conditionally renders the quantity selector, delete button, and unit price column (full view) or a compact quantity-times-unit-price display (preview view). Local `updating` and `error` state manage spinner and error message visibility during async mutations.

## Flow
**Props in:** `item` (`HttpTypes.StoreCartLineItem`), `type` (default `"full"`), `currencyCode`.  
**Events out:** `changeQuantity` calls `updateLineItem` from `@lib/data/cart` with `lineId` and new `quantity`, then catches errors into local state. Max quantity is clamped to 10 (hardcoded pending inventory API integration).  
**Deletion:** `DeleteButton` receives `item.id` and handles remove via its own server action path.

## Integration
**lib/data:** Imports `updateLineItem` from `@lib/data/cart`.  
**Common components:** `Table`, `Text`, `clx` from `@modules/common/components/ui`; `Thumbnail` from `@modules/products/components/thumbnail`; `LineItemOptions`, `LineItemPrice`, `LineItemUnitPrice` from `@modules/common/components/`; `LocalizedClientLink`; `DeleteButton`; `Spinner` icon.  
**Child component:** `CartItemSelect` from `@modules/cart/components/cart-item-select`.  
**Imported by:** `ItemsTemplate` and `ItemsPreviewTemplate` (`templates/`), which pass the item data and choose full or preview mode.
