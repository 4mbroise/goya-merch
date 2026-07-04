# goya-merch-backend/apps/storefront/src/modules/skeletons/components/skeleton-cart-item/

## Responsibility
Placeholder for a single row in the cart items table, mimicking image thumbnail, product name, quantity controls, and price columns.

## Design
Uses `Table.Row` / `Table.Cell` from the common UI kit with `animate-pulse` divs. Five cells: image (24x24), text info (two lines), quantity stepper (button + input), unit price, and total price.

## Integration
Consumed by `SkeletonCartPage` template (rendered 4 times via `repeat()`).
