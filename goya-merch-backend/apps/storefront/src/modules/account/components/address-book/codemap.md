# goya-merch-backend/apps/storefront/src/modules/account/components/address-book/

## Responsibility
Container component that composes the address management UI — an "Add address" card and a list of editable address cards.

## Design
Presentational container. Receives the full customer object (with its `addresses` array) and the current region. Iterates over `customer.addresses` to render an `EditAddress` card per address, plus one `AddAddress` card for creating new entries.

## Flow
**Props in**: `customer` (`HttpTypes.StoreCustomer`), `region` (`HttpTypes.StoreRegion`).

**Renders**: A responsive 2-column grid (`lg:grid-cols-2`) containing:
- One `<AddAddress region={region} addresses={addresses} />` component
- One `<EditAddress region={region} address={address} />` per existing address

## Integration
- Used by: the `/account/addresses` route page.
- Composes: `address-card/add-address.tsx` and `address-card/edit-address-modal.tsx`.
- Props passed through: `region` for country selection, `addresses` for the add form context.
