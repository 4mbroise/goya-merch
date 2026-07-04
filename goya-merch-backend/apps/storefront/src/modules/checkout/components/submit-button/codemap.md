# goya-merch-backend/apps/storefront/src/modules/checkout/components/submit-button/

## Responsibility

A wrapper around the common `Button` component that hooks into React 19's `useFormStatus()` to automatically show a loading spinner while the parent `<form>` action is pending.

## Design

Thin adapter for form submission UX. Uses `useFormStatus` from `react-dom` (React 19) to read the `pending` state of the nearest enclosing `<form>`. Passes `isLoading={pending}` and `type="submit"` to the base `Button`. Accepts variant, size, className, and data-testid props. Exported as a named export, not default.

## Flow

Props in: `children`, optional `variant`, `size`, `className`, `data-testid`. Renders a `<Button type="submit">` whose `isLoading` is bound to `pending` from `useFormStatus`. Works only within a `<form>` using a `formAction` prop or `<form action={...}>`.

## Integration

Imports `Button` from `@modules/common/components/ui`. Used as the submit control in `Addresses` form and `DiscountCode` form. Named export pattern (`export function SubmitButton`).
