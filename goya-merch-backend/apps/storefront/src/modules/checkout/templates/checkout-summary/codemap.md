# goya-merch-backend/apps/storefront/src/modules/checkout/templates/checkout-summary/

## Responsibility

Right-hand sidebar in the checkout layout showing the cart overview: line items preview, totals breakdown, and the discount code panel. Sticky on desktop.

## Design

Template composition (server component, no "use client"). Stacks `CartTotals`, `ItemsPreviewTemplate` (from cart module), and `DiscountCode` vertically inside a sticky container. On mobile (`small:` breakpoint), the layout reverses (`flex-col-reverse`) so the cart summary appears below the form. Uses `Divider` for visual separation. Read-only — no editing of quantities or items from checkout.

## Flow

Props in: `cart` (StoreCart).
- Renders `<div className="sticky top-0 ...">` with reversed flex column on mobile.
- Shows "In your Cart" heading, followed by `CartTotals` (cart totals display), `ItemsPreviewTemplate` (read-only item list), and `DiscountCode` (expandable promotion form).
- All content is server-rendered; `DiscountCode` is a client component nested inside.

## Integration

Imports `CartTotals` from `@modules/common/components/cart-totals`, `ItemsPreviewTemplate` from `@modules/cart/templates/preview`, `DiscountCode` from `@modules/checkout/components/discount-code`, and common UI primitives. Consumed by the checkout page layout alongside `CheckoutForm`.
