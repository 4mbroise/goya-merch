# goya-merch-backend/apps/storefront/src/modules/checkout/components/billing_address/

## Responsibility

Renders a grid of input fields for the billing address form. Collects address data prefixed with `billing_address.` for server-action form submission.

## Design

Presentational leaf component. Uses local `useState<Record<string, string>>` for form data, initialized from `cart.billing_address` on mount. Fields include first name, last name, address, company, postal code, city, country select, province, and phone. Each `<Input>` uses the `billing_address.*` naming convention so the parent's server action can extract nested address data from `FormData`.

## Flow

Props in: `cart` (StoreCart | null). Stateless from the parent's perspective — no callbacks, no submit logic. `handleChange` updates local state on every keystroke. The form data is submitted by the parent `<form>` via native browser form submission.

## Integration

Imports `Input` from `@modules/common/components/input` and `CountrySelect` from `../country-select`. Consumed by `Addresses` (addresses) when `sameAsBilling` is unchecked. Fields use standard HTML `autoComplete` attributes.
