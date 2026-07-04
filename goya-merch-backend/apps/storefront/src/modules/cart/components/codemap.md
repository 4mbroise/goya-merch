# goya-merch-backend/apps/storefront/src/modules/cart/components/

## Responsibility
Provides reusable leaf UI components that render individual cart elements: a quantity selector, an empty-state message, a full line-item row, and a sign-in prompt. Each component is self-contained in its own subfolder with a single `index.tsx` default export.

## Design
Presentational component pattern. Components are either entirely static (no `"use client"`) or use the client directive only when interactivity is required (state, event handlers). They receive data via props and emit changes via callbacks or direct server action calls.

## Children
| Component | Interactive | Responsibility |
|---|---|---|
| `cart-item-select/` | Yes | Styled `<select>` for quantity, wrapped in IconBadge |
| `item/` | Yes | Full line-item row with thumbnail, title, options, quantity selector, unit price, total, and delete |
| `empty-cart-message/` | No | Static message with link to /store when cart is empty |
| `sign-in-prompt/` | No | Static prompt with sign-in button linking to /account |

## Integration
**Consumed by:** `templates/` — `CartTemplate` consumes `EmptyCartMessage` and `SignInPrompt`; `ItemsTemplate` and `ItemsPreviewTemplate` consume `Item`, which in turn imports `CartItemSelect`. External consumers like `modules/checkout/templates/checkout-summary/` also use the templates that wrap these components.
