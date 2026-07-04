# goya-merch-backend/apps/storefront/src/modules/common/components/divider/

## Responsibility

A thin horizontal rule used as a visual separator between sections of the UI.

## Design

A single `<div>` with `h-px w-full border-b border-gray-200`. Accepts an optional `className` for override. Uses `clx` from `@modules/common/components/ui`.

## Props

```ts
{
  className?: string
}
```

## Integration

Used across cart, checkout, and order summary panels.
