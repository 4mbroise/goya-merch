# goya-merch-backend/apps/storefront/src/modules/home/components/hero/

## Responsibility
Renders the full-viewport hero section of the landing page with the GOYA wordmark, "Official Merch" tagline, and a "Shop Now" CTA linking to `/store`.

## Design
Stateless Presentational Component — no props, no state, no data fetching. Uses the `next/image` component for the GOYA logo SVG and `LocalizedClientLink` for locale-aware navigation.

## Flow
None (pure markup). Clicking "Shop Now" navigates to the store page.

## Integration
- `next/image`, `@modules/common/components/localized-client-link`
- Consumed by the home page route
