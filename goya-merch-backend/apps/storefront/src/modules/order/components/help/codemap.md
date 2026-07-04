# goya-merch-backend/apps/storefront/src/modules/order/components/help/

## Responsibility

Renders a static "Need help?" section at the bottom of order detail and order confirmation pages, providing links to the contact page for customer support and returns/exchanges.

## Design

Presentational component with no props, no state, and no side effects. Uses `Heading` from `@modules/common/components/ui` for the section title and `LocalizedClientLink` for locale-aware navigation to `/contact`. Both links point to the same `/contact` route.

## Flow

No props in, no events out. Pure static render.

## Integration

- Consumed by: `OrderCompletedTemplate` and `OrderDetailsTemplate`
- Dependencies: `@modules/common/components/ui` (Heading), `@modules/common/components/localized-client-link`
- External route: `/contact` (customer support page)
