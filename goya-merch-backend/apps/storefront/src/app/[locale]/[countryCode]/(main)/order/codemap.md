# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/

## Responsibility

Intermediate route aggregate for order-related pages. No page file at this level; serves as the parent for `[id]` child routes dealing with post-purchase flows.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Only contains a `[id]/` child directory.
- Visiting `/fr/order` directly results in a 404.

## Child Routes

- `[id]/` — Order-specific sub-routes (confirmed, transfer).
