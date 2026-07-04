# goya-merch-backend/apps/storefront/src/modules/cart/templates/

## Responsibility
Composes cart leaf components into complete page-level templates. Provides three surface variants: the full cart page (`CartTemplate`), the line-item listing for the cart page (`ItemsTemplate`), the compact preview for the checkout summary drawer (`ItemsPreviewTemplate`), and the order summary sidebar (`Summary`).

## Design
Template composition pattern. Files are plain `.tsx` modules (no folder-per-component structure) because they are compositions rather than reusable leaf components. `CartTemplate` and `ItemsTemplate` are server-compatible; `ItemsPreviewTemplate` and `Summary` use `"use client"` for interactivity. Conditional rendering handles empty-cart vs. populated-cart states.

## Files

### index.tsx — CartTemplate
- **Props:** `cart: HttpTypes.StoreCart | null`, `customer: HttpTypes.StoreCustomer | null`
- **Flow:** If `cart?.items?.length` is truthy, renders a two-column grid. Left column: `SignInPrompt` (when no customer), `Divider`, `ItemsTemplate`. Right column (sticky): `Summary`. If cart is empty/null: renders `EmptyCartMessage`.
- **Consumed by:** `app/[countryCode]/(main)/cart/page.tsx`

### items.tsx — ItemsTemplate
- **Props:** `cart?: HttpTypes.StoreCart`
- **Flow:** Renders a "Cart" heading and a `Table` with `Item` components sorted by `created_at` descending. Shows 5 `SkeletonLineItem` placeholders when cart is undefined (loading state).
- **Consumed by:** `CartTemplate`

### preview.tsx — ItemsPreviewTemplate
- **Props:** `cart: HttpTypes.StoreCart`
- **Flow:** `"use client"`. Renders `Item` components with `type="preview"` (compact rows without quantity/delete controls). Container scrolls vertically if more than 4 items (max-height 420px with hidden scrollbar).
- **Consumed by:** `modules/checkout/templates/checkout-summary/`

### summary.tsx — Summary
- **Props:** `cart: HttpTypes.StoreCart`
- **Flow:** `"use client"`. Renders a "Summary" heading, `DiscountCode` input, `Divider`, `CartTotals` component, and a "Go to checkout" `Button` linking to `/checkout?step=<step>`. The `getCheckoutStep` helper determines the correct step (`"address"`, `"delivery"`, or `"payment"`) based on cart shipping address, email, and shipping method state.
- **Consumed by:** `CartTemplate`

## Integration
**lib/data:** No direct imports in templates — data flows in via props from the parent route/page.  
**Common components:** `Table`, `Heading`, `Button`, `Divider` from `@modules/common/components/`; `CartTotals`; `DiscountCode` from `@modules/checkout/components/`; `SkeletonLineItem` from `@modules/skeletons/components/`.  
**Cart components:** `EmptyCartMessage`, `SignInPrompt`, `Item`.  
**Route consumers:** Cart page (`app/[countryCode]/(main)/cart/page.tsx`), Checkout summary drawer (`modules/checkout/templates/checkout-summary/`).
