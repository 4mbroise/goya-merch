# goya-merch-backend/apps/storefront/src/modules/common/components/input/

## Responsibility

A floating-label text input with an optional password visibility toggle. Used for all text entry in checkout forms, account forms, and address entry.

## Design

Wraps a native `<input>` with a floating `<label>` using the `placeholder=" "` + `absolute` positioning technique. Uses `forwardRef` and `useImperativeHandle` to expose the inner input ref. For `type="password"`, renders an eye/eye-off toggle button that swaps between `text` and `password` input types. Top-level error/touched props from Formik-style forms are accepted but not rendered.

## Props

```ts
{
  label: string                                           // floating label text
  name: string
  type?: string                                           // forwarded to input; 'password' adds toggle
  required?: boolean                                      // appends '*' to label
  topLabel?: string                                       // optional static label above input
  errors?: Record<string, unknown>                        // accepted but not rendered
  touched?: Record<string, unknown>                       // accepted but not rendered
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'placeholder'>
```

## Integration

Used in checkout (shipping, payment, billing forms), account (profile, address forms), and anywhere text input is needed.
