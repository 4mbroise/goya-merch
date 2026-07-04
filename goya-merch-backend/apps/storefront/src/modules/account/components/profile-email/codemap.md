# goya-merch-backend/apps/storefront/src/modules/account/components/profile-email/

## Responsibility
Inline editor for the customer's email address. Displays the current email and provides a form to update it.

## Design
Client component (`"use client"`). Uses `useActionState` with a local `updateCustomerEmail` stub function — the actual update is not yet implemented (marked with a TODO comment: "It seems we don't support updating emails now?"). Wraps the form in `AccountInfo` for the disclosure/edit/success/error lifecycle.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer`.

**Form**: Single email input, pre-filled with `customer.email`. Always `required`.

**Submission**: The `updateCustomerEmail` stub ignores the form data and immediately returns `{ success: true, error: null }` — meaning the "Save" action succeeds silently without persisting changes. On success, the edit panel auto-closes.

## Integration
- Used by: the `/account/profile` route page.
- Dependencies: `AccountInfo` from `../account-info/`, `Input` from `@modules/common/components/input`.
- Note: Email update is not wired to a server action; this component is effectively read-only until backend support is added.
