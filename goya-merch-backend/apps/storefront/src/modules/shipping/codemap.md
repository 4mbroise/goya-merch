# goya-merch-backend/apps/storefront/src/modules/shipping/

## Responsibility
Provides the free-shipping progress nudge UI that encourages customers to add more items to reach the free-shipping threshold.

## Design
Module root — aggregates the `components/` subtree which contains a single component: `free-shipping-price-nudge`.

## Flow
Cart data and shipping options are fetched upstream by the parent route and passed to the nudge component for threshold computation.

## Integration
- Consumed by cart-related pages and potentially as a persistent overlay
- Children: `components/`
