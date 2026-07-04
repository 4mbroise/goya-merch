# goya-merch-backend/apps/storefront/src/modules/account/components/profile-billing-address/

## Responsibility
Inline editor for the customer's default billing address. Displays current billing address details or "No billing address" fallback. Allows creating or updating the billing address through a form wrapped in `AccountInfo`.

## Design
Client component (`"use client"`). Uses `useActionState` with either `addCustomerAddress` (when no billing address exists) or `updateCustomerAddress` (when editing existing). Derives a flat country option list from `regions` via `useMemo` for the `NativeSelect` country picker. Uses `AccountInfo` wrapper for the disclosure/edit/success/error lifecycle.

## Flow
**Props in**: `customer: HttpTypes.StoreCustomer`, `regions: HttpTypes.StoreRegion[]`.

**Data derivation**:
- Finds `billingAddress` from `customer.addresses` where `is_default_billing === true`.
- Builds `regionOptions` as `{ value: iso_2, label: display_name }[]` from `regions`.
- `currentInfo` renders the address lines (name, company, address, postal/city, country) or "No billing address".

**Form fields**: Hidden `addressId`, first_name, last_name, company, phone, address_1, address_2, postal_code, city, province, country_code (NativeSelect). Pre-filled from existing billing address.

**Submission**: Calls the appropriate server action. On success, auto-closes the edit panel via `AccountInfo`.

## Integration
- Used by: the `/account/profile` route page.
- Data functions: `addCustomerAddress`, `updateCustomerAddress` from `@lib/data/customer`.
- Dependencies: `AccountInfo` from `../account-info/`, `Input` from `@modules/common/components/input`, `NativeSelect` from `@modules/common/components/native-select`.
