# goya-merch-backend/apps/storefront/src/modules/order/components/items/

## Responsibility

Composes individual `Item` components into a full line-items table for an order. Handles the empty/loading state by rendering `SkeletonLineItem` placeholders when the items array is empty.

## Design

Thin composition component that accepts the full `HttpTypes.StoreOrder` and extracts `order.items`. Sorts items by `created_at` descending. Falls back to 5 skeleton rows via `repeat(5)` from `@lib/util/repeat` when no items are present. Uses `Divider` above the table and wraps the body in `Table` from the shared UI kit.

## Flow

**Props in**: `order` (HttpTypes.StoreOrder).  
**Events out**: None.  
**Data calls**: None. Delegates per-item rendering to `Item`.

## Integration

- Consumed by: `OrderCompletedTemplate` and `OrderDetailsTemplate`
- Dependencies: `@lib/util/repeat`, `@modules/common/components/ui` (Table), `@modules/common/components/divider`, `@modules/order/components/item`, `@modules/skeletons/components/skeleton-line-item`
- Test hooks: `data-testid="products-table"`
