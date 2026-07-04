# goya-merch-backend/apps/storefront/src/modules/common/components/cart-totals/

## Responsibility

Renders the full price breakdown for a cart or order: item subtotal, shipping, discount (conditionally), taxes, and total. Used in the cart drawer and checkout summary.

## Design

Presentational component marked `"use client"`. Receives a flat `totals` object with nullable numeric fields and a `currency_code`. Delegates currency formatting to `convertToLocale` from `@lib/util/money`. Each line renders as a left-aligned label / right-aligned value row, separated from the total by a thin divider.

## Props

```ts
{
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}
```

## Integration

Used by the Cart module (cart drawer, checkout pages). Not used standalone.
