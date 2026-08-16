# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/account/@dashboard/orders/details/

## Responsibility

Intermediate route aggregate for order detail pages. No page file at this level; serves as the parent path segment for `[id]` dynamic order detail routes.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. This folder only contains a `[id]/` child directory and its own `codemap.md`.
- Functions as a URL hierarchy segment: `/fr/account/orders/details/<id>`.

## Child Routes

- `[id]/` — Single order detail page (`page.tsx`).
