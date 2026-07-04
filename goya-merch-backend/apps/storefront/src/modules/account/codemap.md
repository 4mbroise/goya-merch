# goya-merch-backend/apps/storefront/src/modules/account/

## Responsibility
Orchestrates the customer account experience — profile management, address book, order history, authentication (login/register), and order transfer requests. Acts as the UI layer over `@lib/data/customer` and `@lib/data/orders` data-access functions.

## Design
- **Folder structure**: `components/` contains leaf presentational and form components (each in its own folder with `index.tsx`); `templates/` contains page-level compositions.
- **Patterns**: `useActionState`-based form handling with progressive enhancement via server actions; `AccountInfo` as a shared disclosure wrapper for inline editing; modal-based address CRUD.
- **State management**: `useToggleState` hook for open/close; `useActionState` for form submission lifecycle; `useEffect` to synchronize success state to UI transitions.
- **Styling**: Tailwind with Medusa UI primitives (`@modules/common/components/ui`), dark-theme-compatible token classes.

## Flow
1. **Authentication**: `LoginTemplate` toggles between `Login` and `Register` components → call `login` / `signup` from `@lib/data/customer`.
2. **Account pages**: `AccountLayout` provides nav sidebar (`AccountNav`) and content slot → child pages use profile editors, address book, or order overview.
3. **Inline editing**: Profile editors (`ProfileName`, `ProfileEmail`, `ProfilePhone`, `ProfilePassword`, `ProfileBillingAddress`) wrap fields in `AccountInfo` which toggles between display and edit mode, calls the appropriate server action, and surfaces success/error feedback.
4. **Address management**: `AddressBook` composes `AddAddress` (modal form) and `EditAddress` (card + edit modal + delete).
5. **Orders**: `OrderOverview` lists `OrderCard` components; `TransferRequestForm` accepts an order ID to request ownership transfer.

## Integration
- **Data layer**: `@lib/data/customer` — `login`, `signup`, `signout`, `updateCustomer`, `addCustomerAddress`, `updateCustomerAddress`, `deleteCustomerAddress`; `@lib/data/orders` — `createTransferRequest`.
- **Shared UI**: `@modules/common/components/ui` (Button, Badge, Heading, Text, Container, IconButton, clx), `@modules/common/components/input`, `@modules/common/components/modal`, `@modules/checkout/components/submit-button`, `@modules/checkout/components/country-select`, `@modules/checkout/components/error-message`, `@modules/common/components/localized-client-link`.
- **Routes consumed by**: `/account`, `/account/profile`, `/account/addresses`, `/account/orders`, `/account/orders/details/[id]` (all under `[countryCode]/account` in the Next.js app router).
