# goya-merch-backend/apps/storefront/src/modules/skeletons/components/

## Responsibility
Provides atomic skeleton placeholder components that emulate specific UI elements (buttons, cards, form fields, table rows, order sections) during data loading.

## Design
Leaf presentational component folder — each skeleton is a small, stateless component that renders grey/translucent `div` blocks with Tailwind `animate-pulse` and `bg-gray-100`/`bg-gray-200` classes. They accept minimal or no props and emit no events. Every skeleton matches the approximate dimensions and layout of the real component it replaces.

## Common Pattern
All skeletons in this folder follow the same pattern:
- **No props** (except `SkeletonCartTotals` which accepts `header?: boolean`)
- **No state, no data fetching, no event handlers**
- **Markup**: `div` elements with fixed width/height, `animate-pulse`, and gray background colors
- **No external dependencies** beyond `@modules/common/components/ui` (Table) where table structure is needed

## Flow
None (pure visual placeholders).

## Integration
- Consumed by skeleton templates and directly as `Suspense` fallbacks
- No Medusa SDK or data library dependencies
