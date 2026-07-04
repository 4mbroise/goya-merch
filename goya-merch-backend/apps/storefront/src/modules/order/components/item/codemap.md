# goya-merch-backend/apps/storefront/src/modules/order/components/item/

## Responsibility

Renders a single line item as a table row in the order/cart items table. Shows the product thumbnail, title, variant options, quantity, unit price, and total price.

## Design

Presentational component accepting a polymorphic `item` prop typed as `HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem` and a `currencyCode` string. Delegates sub-rendering to shared common components: `Thumbnail`, `LineItemOptions`, `LineItemUnitPrice`, and `LineItemPrice`. Wraps the row in `Table.Row` and `Table.Cell` from the shared UI kit.

## Flow

**Props in**: `item` (line item data), `currencyCode` (string for price formatting).  
**Events out**: None.  
**Data calls**: None.

## Integration

- Consumed by: `@modules/order/components/items`
- Dependencies: `@modules/common/components/ui` (Table, Text), `@modules/common/components/line-item-options`, `@modules/common/components/line-item-price`, `@modules/common/components/line-item-unit-price`, `@modules/products/components/thumbnail`
- Test hooks: `data-testid="product-row"`, `data-testid="product-name"`, `data-testid="product-variant"`, `data-testid="product-quantity"`
