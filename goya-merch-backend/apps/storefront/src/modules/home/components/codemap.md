# goya-merch-backend/apps/storefront/src/modules/home/components/

## Responsibility
Houses the two presentational building blocks of the home page: a full-screen hero banner and the featured-products section.

## Design
Presentational component folder — each child is a standalone React component (either server or client) in its own subdirectory with an `index.tsx` entry point.

## Flow
No shared state. Each component receives props directly from the parent route/page.

## Integration
- Children: `hero/`, `featured-products/`
