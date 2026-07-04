# goya-merch-backend/apps/storefront/src/modules/checkout/components/addresses/

## Responsibility

First step in the multi-step checkout flow. Manages the shipping and billing address section: open/closed state via URL `?step=address`, collapsible form vs. read-only summary, and submission via React 19 `useActionState`.

## Design

Template-level composition (step container). Uses `useActionState` bound to `setAddresses` from `@lib/data/cart` for server-action form submission. State machine pattern: URL `step` search param drives `isOpen`. Collapsed state shows a summary of shipping address, contact info, and billing address (or "same as shipping"). Incorporates a `sameAsBilling` toggle via `useToggleState` hook.

## Flow

Props in: `cart` (StoreCart | null), `customer` (StoreCustomer | null).
- When `step=address`: renders `<form action={formAction}>` containing `ShippingAddress`, conditionally `BillingAddress` (when not same-as-billing), `SubmitButton`, and `ErrorMessage`.
- On submit: `setAddresses` server action is called with form data; the `useActionState` `message` is displayed on error.
- When collapsed: displays three-column summary (shipping address, contact, billing address) with an Edit button that navigates to `?step=address`.
- Emits `Divider` after section.

## Integration

Composes `ShippingAddress`, `BillingAddress`, `ErrorMessage`, and `SubmitButton` (named export). Data action: `setAddresses` from `@lib/data/cart`. Guarded by `?step=address` search param; navigates via `useRouter`/`usePathname`. Consumed by `CheckoutForm` template.
