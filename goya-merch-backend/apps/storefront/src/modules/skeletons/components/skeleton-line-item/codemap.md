# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-line-item/

## Responsibility
Placeholder for a single line item row in the order summary table (used on order confirmed / order detail pages).

## Design
Structurally identical to `SkeletonCartItem` but without the unit-price column. Uses `Table.Row` / `Table.Cell` with `animate-pulse` divs for image, text, quantity, and total columns.

## Integration
Consumed by order-related skeleton templates.
