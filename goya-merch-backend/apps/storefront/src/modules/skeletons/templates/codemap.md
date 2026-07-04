# goya-merch-backend/apps/storefront/src/modules/skeletons/templates/

## Responsibility
Provides page-level skeleton compositions that mirror the layout of real pages: cart page, order confirmed page, product grid, and related products section. These are used as `Suspense` fallbacks.

## Design
Template composition folder — each template composes multiple skeleton components (from `components/`) and optionally `repeat()` from `@lib/util/repeat` to render placeholders in a realistic quantity (e.g., 4 cart items, 8 product grid items). They maintain the same responsive grid classes as their live counterparts.

## Flow
Each template is self-contained and requires no props (except `SkeletonProductGrid` which accepts `numberOfProducts`). They match the layout structure of the corresponding live template but replace all content with skeleton blocks.

## Integration
- Composes skeleton leaf components from `@modules/skeletons/components/`
- `@lib/util/repeat` for array generation
- `@modules/common/components/ui` (`Table`) for table structure
- Consumed as `Suspense fallback` in store, cart, order, and product detail page templates
