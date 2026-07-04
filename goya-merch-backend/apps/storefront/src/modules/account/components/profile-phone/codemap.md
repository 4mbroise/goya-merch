# goya-merch-backend/apps/storefront/src/modules/account/components/profile-phone/

## Responsibility
Inline editor for the customer's phone number. Displays the current phone value and provides a form to update it.

## Design
Client component (`"use client"`). Uses `useActionState` with a local `updateCustomerPhone` wrapper that calls `updateCustomer` from `@lib/data/customer`. Wraps the form in `AccountInfo` for the disclosure/edit/success/error lifecycle.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer`.

**Form**: Single phone input (type="phone"), required, pre-filled with `customer.phone`.

**Submission**: `updateCustomerPhone` extracts `phone` from FormData, calls `await updateCustomer({ phone })`, and returns `{ success: true, error: null }` on success or `{ success: false, error }` on exception. On success, the edit panel auto-closes.

## Integration
- Used by: the `/account/profile` route page.
- Data function: `updateCustomer` from `@lib/data/customer`.
- Dependencies: `AccountInfo` from `../account-info/`, `Input` from `@modules/common/components/input`.
- Note: The component is internally named `ProfileEmail` due to a copy-paste error in the source, but functions as a phone editor.
