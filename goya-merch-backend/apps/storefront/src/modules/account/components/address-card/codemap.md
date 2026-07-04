# goya-merch-backend/apps/storefront/src/modules/account/components/address-card/

## Responsibility
Two sub-components for address CRUD: a modal form to create a new address (`add-address.tsx`) and a card with modal edit + delete actions for existing addresses (`edit-address-modal.tsx`).

## Design
Both are client components using `useActionState` for form submission with server actions, `useToggleState` for modal open/close, and `@modules/common/components/modal` for the dialog overlay. Follow the same form field layout (first/last name, company, address lines, postal code/city, province, country select, phone).

### add-address.tsx
- **Props**: `region`, `addresses`.
- **Form action**: `addCustomerAddress` from `@lib/data/customer`.
- **Behavior**: Opens a modal on button click → submits address form → on success closes modal. Shows error inline on failure.

### edit-address-modal.tsx
- **Props**: `region`, `address` (the existing address), optional `isActive` (border highlight).
- **Form action**: `updateCustomerAddress` (used via `useActionState`).
- **Delete action**: `deleteCustomerAddress(address.id)` with spinner state during removal.
- **Behavior**: Displays address details in a card with Edit/Remove buttons. Edit opens a pre-filled modal. Remove calls delete directly without confirmation. Success auto-closes edit modal.

## Integration
- Called by: `AddressBook` container (`../address-book/`).
- Data functions: `addCustomerAddress`, `updateCustomerAddress`, `deleteCustomerAddress` from `@lib/data/customer`.
- Shared deps: `CountrySelect` from `@modules/checkout/components/country-select`, `SubmitButton` from `@modules/checkout/components/submit-button`.
