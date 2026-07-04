# goya-merch-backend/apps/storefront/src/modules/cart/components/empty-cart-message/

## Responsibility
Renders the fallback UI when the cart has no items. Displays a "Cart" heading, an explanatory message, and an `InteractiveLink` that navigates to the `/store` page.

## Design
Static presentational component (no `"use client"` directive). Pure layout with no state, hooks, or event handling. Centered vertically with `py-48`, aligned to the start of the flex column.

## Flow
No props in, no events out. Always renders identically. Identified by `data-testid="empty-cart-message"` for integration testing.

## Integration
**Imports:** `Heading`, `Text` from `@modules/common/components/ui`; `InteractiveLink` from `@modules/common/components/interactive-link`.  
**Imported by:** `CartTemplate` (`templates/index.tsx`), rendered when `cart?.items?.length` is falsy.
