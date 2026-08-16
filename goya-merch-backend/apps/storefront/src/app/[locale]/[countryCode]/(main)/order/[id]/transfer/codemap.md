# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/order/[id]/transfer/

## Responsibility

Intermediate route aggregate for the order ownership transfer flow. No page file at this level; serves as the parent for the `[token]` dynamic segment.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Contains only `[token]/` child directory.
- Visiting `/fr/order/<id>/transfer` directly results in a 404.

## Child Routes

- `[token]/` — Transfer request landing page with accept/decline actions.
