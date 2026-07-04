# goya-merch-backend/apps/storefront/src/modules/common/components/checkbox/

## Responsibility

A labelled checkbox toggle used primarily for shipping address confirmation and similar toggles in checkout flows.

## Design

Layers the `Checkbox` and `Label` primitives from `@modules/common/components/ui` into a single presentational component. The checkbox input is set to `readOnly`; clicks are handled via `onClick` on the wrapper, not via the native `onChange`. Supports `data-testid` for E2E testing.

## Props

```ts
{
  checked?: boolean       // default true
  onChange?: () => void   // click handler
  label: string           // visible label text
  name?: string
  'data-testid'?: string
}
```

## Integration

Used in checkout forms (shipping address, billing address confirmation).
