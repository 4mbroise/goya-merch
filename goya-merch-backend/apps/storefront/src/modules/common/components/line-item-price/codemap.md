# goya-merch-backend/apps/storefront/src/modules/common/components/line-item-price/

## Responsibility

Renders a formatted line-item total price with optional discount strikethrough and percentage badge. Used in cart and order summaries.

## Design

Computes `originalPrice` and `currentPrice` from the item's `total` and `original_total`. If the current price is lower, renders the original price with a line-through, a percentage-off badge (in `"default"` style), and the current price in interactive (accent) color. Delegates formatting to `convertToLocale` from `@lib/util/money` and percentage calculation to `getPercentageDiff` from `@lib/util/get-percentage-diff`.

## Props

```ts
{
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"    // "tight" omits the "Original:" prefix and discount percentage
  currencyCode: string
}
```

## Integration

Used in Cart module (cart drawer, checkout) and Order module (order details).
