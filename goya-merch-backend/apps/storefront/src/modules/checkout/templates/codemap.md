# goya-merch-backend/apps/storefront/src/modules/checkout/templates/

## Responsibility

Top-level composition templates that arrange checkout step components and the order summary sidebar. These are consumed directly by the checkout page route.

## Design

Both templates are server components (no `"use client"`). `checkout-form/` is an async server component that fetches shipping and payment methods at request time and renders the four-step form vertically. `checkout-summary/` renders the sticky order summary sidebar with cart items, totals, and discount code. They are designed to be placed side-by-side in a two-column layout on the checkout page.

## Flow

`checkout-form/` receives `cart` and `customer` as props, fetches `listCartShippingMethods` and `listCartPaymentMethods`, then composes `Addresses` -> `Shipping` -> `Payment` -> `Review` in a single column. `checkout-summary/` receives `cart`, renders `CartTotals`, `ItemsPreviewTemplate`, and `DiscountCode` in a sticky container.

## Integration

Data: `@lib/data/fulfillment` (listCartShippingMethods), `@lib/data/payment` (listCartPaymentMethods). Composes components from `@modules/checkout/components/` and `@modules/common/components/`. Consumed by the checkout route page (app router layout/page).

## Children

- `checkout-form/` — Multi-step checkout form server component
- `checkout-summary/` — Order summary sidebar template
