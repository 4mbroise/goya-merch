# goya-merch-backend/apps/storefront/src/modules/common/components/native-select/

## Responsibility

A styled native `<select>` dropdown with a placeholder state and a `ChevronUpDown` icon. Used for country, state, and other option pickers in forms.

## Design

Wraps a native `<select>` element with `forwardRef` and `useImperativeHandle`. Detects the placeholder state by checking if the value is empty on mount/change and applies muted text styling. Renders a `ChevronUpDown` icon (from `@medusajs/icons`) as a decorative absolute-positioned indicator. The first `<option>` is disabled and serves as the placeholder.

## Props

```ts
{
  placeholder?: string             // default "Select..."
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>
```

## Integration

Used in checkout address forms (country/state dropdowns) and any form requiring a select input.
