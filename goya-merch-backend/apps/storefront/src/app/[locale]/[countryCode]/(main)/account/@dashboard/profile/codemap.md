# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/profile/

## Responsibility

Customer profile management page. Allows authenticated users to view and update their name, email, phone number, and billing address.

## Design

- **Async Server Component**: fetches customer and regions; calls `notFound()` if either is missing.
- Renders a vertical stack of profile editing sections separated by inline `<Divider />` components:
  - `ProfileName`, `ProfileEmail`, `ProfilePhone` (each with an inline edit form).
  - `ProfileBillingAddress` (full address editor with region selector).
- Password change is currently commented out.

## Flow

1. Calls `retrieveCustomer()` and `listRegions()`.
2. If customer or regions are falsy, calls `notFound()`.
3. Renders the heading and all profile section components.

## Integration

- Data: `@lib/data/customer` (`retrieveCustomer`), `@lib/data/regions` (`listRegions`).
- Components: `ProfileName`, `ProfileEmail`, `ProfilePhone`, `ProfileBillingAddress` from `@modules/account/components/`.
