# goya-merch-backend/apps/storefront/src/modules/home/

## Responsibility
Provides the landing page of the GOYA storefront, composed of a full-viewport hero banner and a list of featured product rails organized by collection.

## Design
Module root — aggregates two leaf presentational components (`hero/`, `featured-products/`) into the home page layout. The module has no template folder; the components are used directly by the app route via React Server Components.

## Flow
No data fetching at this level. Props (collections, region) are passed down from the page route. Each child component handles its own data or rendering.

## Integration
- Consumed by `apps/storefront/src/app/[countryCode]/(main)/page.tsx` (home page route)
- Children: `components/hero/`, `components/featured-products/`
