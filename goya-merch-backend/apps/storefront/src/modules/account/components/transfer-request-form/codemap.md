# goya-merch-backend/apps/storefront/src/modules/account/components/transfer-request-form/

## Responsibility
Form that allows a customer to request ownership transfer of an existing order by providing its order ID. Displays a success banner with the order ID and notification email upon successful submission.

## Design
Client component (`"use client"`). Uses `useActionState` with `createTransferRequest` from `@lib/data/orders`. Manages a local `showSuccess` state to display a dismissible success banner after a successful transfer request.

## Flow
**No props** — self-contained component.

**Form**: Single `order_id` text input + "Request transfer" submit button.

**Submission**: Calls `createTransferRequest` with the form data. On success (`state.success && state.order`), shows a banner with:
- Green checkmark + "Transfer for order {order.id} requested"
- "Transfer request email sent to {order.email}"
- Dismiss button (X icon)

On error, displays the error text in rose-500 color below the form.

## Integration
- Used by: the `/account/orders` route page (alongside `OrderOverview`).
- Data function: `createTransferRequest` from `@lib/data/orders`.
- Dependencies: `SubmitButton` from `@modules/checkout/components/submit-button`, `Input` from `@modules/common/components/ui`, `@medusajs/icons` (CheckCircleMiniSolid, XCircleSolid).
