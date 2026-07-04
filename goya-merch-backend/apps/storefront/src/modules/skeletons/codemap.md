# goya-merch-backend/apps/storefront/src/modules/skeletons/

## Responsibility
Provides loading placeholder (skeleton) components and templates for every page-level UI section, ensuring a consistent shimmer/placeholder experience while async data is being fetched.

## Design
Module root — aggregates `components/` (leaf skeleton blocks) and `templates/` (page-level skeleton compositions). Each skeleton mirrors the layout structure of its corresponding live component but uses `animate-pulse` / gray background divs in place of real content.

## Flow
No props from business logic — skeletons are self-contained, stateless, and accept only sizing hints (e.g., `numberOfProducts`). They are used as `Suspense` fallbacks in server component templates.

## Integration
- Consumed across the app via `Suspense fallback` props in category, collection, store, cart, order, and product detail templates
- Children: `components/`, `templates/`
