# goya-merch-backend/apps/storefront/src/modules/common/components/line-item-options/

## Responsibility

Displays the variant title (e.g., "Size: M") for a cart or order line item.

## Design

A minimal presentational component that reads `variant.title` from a `StoreProductVariant` and renders it inside a `Text` component with text-ellipsis overflow handling.

## Props

```ts
{
  variant: HttpTypes.StoreProductVariant | undefined
  'data-testid'?: string
  'data-value'?: HttpTypes.StoreProductVariant
}
```

## Integration

Used in cart and order line-item rows alongside `LineItemPrice` and `LineItemUnitPrice`.
