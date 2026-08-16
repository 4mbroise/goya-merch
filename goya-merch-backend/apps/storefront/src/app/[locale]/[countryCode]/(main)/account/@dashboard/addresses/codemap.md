# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/addresses/

## Responsibility

Address book page where authenticated customers view, add, edit, and delete their saved shipping addresses.

## Design

- **Async Server Component**: fetches customer and region data; guards with `notFound()` if either is missing.
- Renders `AddressBook` component from `@modules/account/components/address-book`, passing `customer` and `region`.
- Includes static heading text and a description paragraph for the "Shipping Addresses" section.

## Flow

1. Fetches `customer` via `retrieveCustomer()` and `region` via `getRegion(countryCode)`.
2. If customer or region is falsy, calls `notFound()`.
3. Renders the heading, description, and `<AddressBook customer={customer} region={region} />`.

## Integration

- Data: `@lib/data/customer` (`retrieveCustomer`), `@lib/data/regions` (`getRegion`).
- Component: `AddressBook` from `@modules/account/components/address-book`.
