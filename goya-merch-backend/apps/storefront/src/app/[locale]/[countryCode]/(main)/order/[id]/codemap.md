# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/

## Responsibility

Intermediate route aggregate scoped to a specific order ID. No page file at this level; branches into the order confirmation page and the order transfer flow.

## Design

- **Dynamic segment** `[id]` — the Medusa order ID.
- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Contains `confirmed/` and `transfer/` child directories.
- Visiting `/fr/order/<id>` directly results in a 404; the valid sub-paths are `/confirmed` and `/transfer/<token>`.

## Child Routes

- `confirmed/` — Order success/confirmation page.
- `transfer/` — Order ownership transfer sub-routes.
