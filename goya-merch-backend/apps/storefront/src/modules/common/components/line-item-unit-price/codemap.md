# goya-merch-backend/apps/storefront/src/modules/common/components/line-item-unit-price/

## Responsibility

Displays the per-unit price for a cart/order line item, including the original unit price and discount when applicable.

## Design

Computes unit prices by dividing `total` and `original_total` by `item.quantity`. If a discount is active, renders the original unit price with strikethrough, a percentage-off badge (in `"default"` style), and the current unit price in interactive color. Differs from `LineItemPrice` by showing per-unit (quantity-divided) amounts.

## Props

```ts
{
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"    // "tight" omits "Original:" prefix and discount percentage
  currencyCode: string
}
```

## Integration

Used alongside `LineItemOptions` and `LineItemPrice` in cart and order line-item detail views.
