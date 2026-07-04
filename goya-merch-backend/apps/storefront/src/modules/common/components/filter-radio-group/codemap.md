# goya-merch-backend/apps/storefront/src/modules/common/components/filter-radio-group/

## Responsibility

A labelled radio-group filter panel used on collection/category pages to narrow product listings (e.g., by price range, sorting order).

## Design

Composes `RadioGroup` and `Label` from `@modules/common/components/ui` with `EllipseMiniSolid` from `@medusajs/icons` as the active indicator. The currently selected item gets a dot icon and bolder text styling. Hidden native radio inputs handle accessibility. Items are an array of `{ value, label }` pairs.

## Props

```ts
{
  title: string                                  // group label displayed above options
  items: { value: string; label: string }[]      // selectable options
  value: string                                  // currently selected value
  handleChange: (value: string) => void          // called on selection
  'data-testid'?: string
}
```

## Integration

Used in the Product module's collection/category views.
