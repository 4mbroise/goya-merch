# goya-merch-backend/apps/storefront/src/modules/cart/

## Responsibility
Root of the cart feature module. Composes presentational leaf components into full-page and embedded cart views consumed by the storefront cart route and the checkout summary drawer. Orchestrates the display of line items, quantity controls, pricing, discount application, and sign-in prompts.

## Design
Feature module split into two subdirectories: `components/` (leaf presentational components, each in its own folder) and `templates/` (compositions that wire components together and pass data). Templates conditionally render the empty state (EmptyCartMessage) or the full cart grid. Parent components are server-rendered where possible; interactive children use `"use client"`.

## Flow
Data flows from the Medusa backend via `@lib/data/cart` server actions (`retrieveCart`, `updateLineItem`). The Next.js cart page (`app/[countryCode]/(main)/cart/page.tsx`) fetches cart and customer asynchronously, then passes them as props to `CartTemplate`. Mutations (quantity changes, deletions) trigger server actions that revalidate cache tags (`"carts"`, `"fulfillment"`).

## Integration
- **lib/data:** `retrieveCart`, `updateLineItem`, `deleteLineItem`
- **Route consumers:** `app/[countryCode]/(main)/cart/page.tsx` (full cart page); `modules/checkout/templates/checkout-summary/` (embedded preview)
- **Children:** `components/` (4 leaf components), `templates/` (4 template files)
