# goya-merch-backend/apps/storefront/src/modules/account/components/profile-password/

## Responsibility
Inline editor for changing the customer's password. Displays a security notice and provides old/new/confirm password fields.

## Design
Client component (`"use client"`). The `updatePassword` handler is a no-op stub (logs "Password update is not implemented" to console). Wraps the form in `AccountInfo` for the disclosure/edit lifecycle. Success state is always `false` and error state is always `false` — the editor can be opened but saving has no effect.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer` (unused — prefixed as `_customer`).

**Form fields**: Three password inputs in a 2-column grid — "Old password", "New password", "Confirm password" (all required, type=password).

**Submission**: The `updatePassword` async function does nothing; `AccountInfo` receives `isSuccess={false}` and `isError={false}` so no feedback is shown. Saving the form is effectively inert.

## Integration
- Used by: the `/account/profile` route page.
- Dependencies: `AccountInfo` from `../account-info/`, `Input` from `@modules/common/components/input`.
- Note: Password change is not yet implemented; the component is a placeholder awaiting Toaster/notification support and a real server action.
