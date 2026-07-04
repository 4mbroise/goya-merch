# goya-merch-backend/apps/storefront/src/modules/checkout/components/address-select/

## Responsibility

Renders a Headless UI Listbox that lets logged-in customers pick one of their saved shipping addresses. Transforms the selected `StoreCustomerAddress` into a `StoreCartAddress` shape for the parent.

## Design

Presentational leaf component. Uses `@headlessui/react` `Listbox` + `Transition` for dropdown behavior and animation. Tracks the currently-matched address via `useMemo` comparing each saved address against the current `addressInput` using `compareAddresses` from `@lib/util/compare-addresses`.

## Flow

Props in: `addresses` (StoreCustomerAddress[]), `addressInput` (StoreCartAddress | null), `onSelect` callback.
On change: `handleSelect(id)` finds the matching saved address and calls `onSelect(savedAddress)` to propagate the selection upward. The component itself holds no mutable state.

## Integration

Imported by `ShippingAddress` (shipping-address). Depends on `Radio` from `@modules/common/components/radio`, `compareAddresses` utility, and `ChevronUpDown` icon from `@medusajs/icons`.
