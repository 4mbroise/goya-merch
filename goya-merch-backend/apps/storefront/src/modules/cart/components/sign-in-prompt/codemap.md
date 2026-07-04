# goya-merch-backend/apps/storefront/src/modules/cart/components/sign-in-prompt/

## Responsibility
Prompts unauthenticated users to sign in while viewing their cart. Displays a heading ("Already have an account?"), a supporting message, and a "Sign in" button that links to the `/account` page.

## Design
Static presentational component (no `"use client"` directive). Uses a flex row layout with `justify-between` to separate the text block from the call-to-action button. No state, hooks, or event callbacks.

## Flow
No props in, no events out. The parent (`CartTemplate`) conditionally renders this component only when `customer` is null.

## Integration
**Imports:** `Button`, `Heading`, `Text` from `@modules/common/components/ui`; `LocalizedClientLink` from `@modules/common/components/localized-client-link`.  
**Imported by:** `CartTemplate` (`templates/index.tsx`), displayed above the `Divider` and `ItemsTemplate` when the user is not logged in.
