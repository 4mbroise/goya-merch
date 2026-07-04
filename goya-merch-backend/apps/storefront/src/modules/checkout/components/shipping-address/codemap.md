# goya-merch-backend/apps/storefront/src/modules/checkout/components/shipping-address/

## Responsibility

Renders the shipping address input form with saved-address quick-select for logged-in customers, plus email and phone fields and the "same as billing" checkbox.

## Design

Form leaf component that composes multiple sub-inputs. Manages local `useState<Record<string, string>>` for form fields prefixed with `shipping_address.` plus `email`. For customers with saved addresses in the current region, renders an `AddressSelect` listbox at the top for one-click fill. Uses `useMemo` to compute `addressesInRegion` by filtering `customer.addresses` against the region's country list. The `setFormAddress` callback populates all form fields from a selected address. A `useEffect` syncs `cart.shipping_address` and `customer.email` into form state when the cart changes.

## Flow

Props in: `customer` (StoreCustomer | null), `cart` (StoreCart | null), `checked` (boolean for same-as-billing), `onChange` (toggle callback).
- Customer with region-valid addresses: shows `AddressSelect` offering saved address fill.
- Input grid: first name, last name, address, company, postal code, city, country select, province.
- Below grid: `Checkbox` for "Billing address same as shipping address", then email and phone inputs.
- All inputs use `shipping_address.*` naming convention for server-action `FormData` extraction.

## Integration

Composes `AddressSelect`, `CountrySelect`. Imports `Input` from `@modules/common/components/input`, `Checkbox` from `@modules/common/components/checkbox`, `Container` from `@modules/common/components/ui`. Uses `mapKeys` from `lodash` for address key remapping. Consumed by `Addresses` component.
