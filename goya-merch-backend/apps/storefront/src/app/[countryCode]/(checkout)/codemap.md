# goya-merch-backend/apps/storefront/src/app/[countryCode]/(checkout)/

## Responsibility

Route group for the checkout flow. Provides a minimal, distraction-free layout with back-to-cart navigation, the GOYA logo, and a Medusa CTA footer.

## Design

- **Route Group** `(checkout)` — the parentheses exclude this segment from the URL path.
- **Server Component** layout renders a white header with a `<LocalizedClientLink>` cart-back button, the `Typo.svg` logo, and a `<MedusaCTA />` in the footer.
- Has its own `not-found.tsx` for 404s during the checkout process.

## Flow

1. Requests matching `/fr/checkout` are handled by this group.
2. `CheckoutLayout` wraps the page in a white `<div>` with nav bar, content slot, and footer.
3. The `<LocalizedClientLink href="/cart">` preserves the current `[countryCode]` when navigating back.

## Integration

- Consumes `LocalizedClientLink` from `@modules/common/components/localized-client-link`.
- Uses `MedusaCTA` from `@modules/layout/components/medusa-cta`.
- Logo image from `/Typo.svg`.
