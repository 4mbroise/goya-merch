# goya-merch-backend/apps/storefront/src/modules/checkout/components/country-select/

## Responsibility

Renders a `<select>` dropdown of countries for a given region. Adapts a `StoreRegion`'s country list into option elements.

## Design

Adapter/wrapper component. Wraps the common `NativeSelect` component from `@modules/common/components/native-select`. Uses `forwardRef` with `useImperativeHandle` to expose the inner `<select>` ref. Country options are memoized (`useMemo`) from `region.countries`, mapping each `iso_2`/`display_name` into value/label pairs.

## Flow

Props in: `region` (StoreRegion), `placeholder` (default "Country"), plus any `NativeSelectProps` and standard select attributes. `defaultValue` and `...props` are spread onto the inner `NativeSelect`. Renders `<option>` for each country; empty array when no region is provided.

## Integration

Consumed by both `ShippingAddress` (shipping-address) and `BillingAddress` (billing_address). Used within larger address forms; its value participates in the parent form's `FormData` via the `name` prop (e.g., `billing_address.country_code`).
