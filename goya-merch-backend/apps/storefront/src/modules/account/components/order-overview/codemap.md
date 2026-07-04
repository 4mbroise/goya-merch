# goya-merch-backend/apps/storefront/src/modules/account/components/order-overview/

## Responsibility
Lists all customer orders using `OrderCard` components, or displays an empty-state with a "Continue shopping" CTA when there are no orders.

## Design
Client component (`"use client"`). Conditional rendering: if `orders.length > 0`, maps over orders with separators; otherwise shows a centered empty-state heading and link to the homepage.

## Flow
**Props in**: `orders: HttpTypes.StoreOrder[]`.

**When orders exist**: Renders each order wrapped in a `<div>` with bottom border (except last), containing `<OrderCard order={o} />`.

**When no orders**: Renders "Nothing to see here" heading, descriptive text, and a "Continue shopping" button linking to `/`.

## Integration
- Used by: the `/account/orders` route page.
- Composes: `OrderCard` from `../order-card/`.
- Dependencies: `Button` from `@modules/common/components/ui`, `LocalizedClientLink`.
