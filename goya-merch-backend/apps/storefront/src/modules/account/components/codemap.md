# goya-merch-backend/apps/storefront/src/modules/account/components/

## Responsibility
Houses all leaf presentational and form components that make up the account area UI. Each sub-folder is a single component with its own `index.tsx` entry point.

## Design
- **Shared editor wrapper**: `account-info/` provides a reusable disclosure-based inline editor (display → edit toggle, success/error badges) used by all profile-field components.
- **Form pattern**: Nearly all mutable components use `useActionState` with server action functions from `@lib/data/customer` for progressive enhancement.
- **Modal pattern**: Address CRUD uses `@modules/common/components/modal` with separate `add-address.tsx` and `edit-address-modal.tsx` in the `address-card/` folder.

## Children
| Component | Role |
|---|---|
| `account-info/` | Disclosure wrapper for inline editing (label, current value, edit form, success/error feedback) |
| `account-nav/` | Responsive navigation sidebar (mobile accordion / desktop link list) |
| `address-book/` | Container composing AddAddress + EditAddress cards |
| `address-card/` | Add-address modal form and edit-address card with delete action |
| `login/` | Sign-in form using `useActionState` with `login` server action |
| `order-card/` | Single order summary card (display_id, date, total, item thumbnails) |
| `order-overview/` | Lists orders via `OrderCard` or shows empty-state CTA |
| `overview/` | Account dashboard (profile completion %, address count, recent orders list) |
| `profile-billing-address/` | Billing address inline editor inside `AccountInfo` |
| `profile-email/` | Email inline editor (update stub — currently a no-op) |
| `profile-name/` | First/last name inline editor using `updateCustomer` |
| `profile-password/` | Password inline editor (update stub — not yet implemented) |
| `profile-phone/` | Phone number inline editor using `updateCustomer` |
| `register/` | Registration form using `useActionState` with `signup` server action |
| `transfer-request-form/` | Order transfer request form using `createTransferRequest` |

## Integration
- All data-fetching and mutation functions are imported from `@lib/data/customer` (or `@lib/data/orders` for transfers).
- Shared UI primitives come from `@modules/common/components/ui`.
- Templates in `../templates/` compose these components into pages for the `/account/*` routes.
