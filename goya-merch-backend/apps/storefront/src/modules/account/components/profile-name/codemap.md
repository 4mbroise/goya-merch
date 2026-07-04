# goya-merch-backend/apps/storefront/src/modules/account/components/profile-name/

## Responsibility
Inline editor for the customer's first and last name. Displays the current full name and provides a form to update it.

## Design
Client component (`"use client"`). Uses `useActionState` with a local `updateCustomerName` wrapper that calls `updateCustomer` from `@lib/data/customer`. Wraps the form in `AccountInfo` for the disclosure/edit/success/error lifecycle.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer`.

**Form fields**: Two inputs in a 2-column grid — "First name" and "Last name", both required, pre-filled from `customer.first_name` / `customer.last_name`.

**Submission**: `updateCustomerName` extracts `first_name` and `last_name` from FormData, calls `await updateCustomer({ first_name, last_name })`, and returns `{ success: true, error: null }` on success or `{ success: false, error }` on exception. On success, the edit panel auto-closes.

## Integration
- Used by: the `/account/profile` route page.
- Data function: `updateCustomer` from `@lib/data/customer`.
- Dependencies: `AccountInfo` from `../account-info/`, `Input` from `@modules/common/components/input`.
