# goya-merch-backend/apps/storefront/src/modules/common/components/radio/

## Responsibility

A styled circular radio button indicating checked/unchecked state. Used for shipping option selection and similar single-choice controls.

## Design

A `<button>` with `role="radio"` and `aria-checked`. The visual indicator is a layered circle technique: an outer ring (`shadow-borders-base`) with a filled inner circle (`bg-ui-bg-interactive`) when checked, plus a small white dot inset. Uses Tailwind group/peer selectors for hover, focus, disabled, and checked state styling.

## Props

```ts
{
  checked: boolean
  'data-testid'?: string     // defaults to 'radio-button'
}
```

## Integration

Used in the Checkout module for shipping option selection.
