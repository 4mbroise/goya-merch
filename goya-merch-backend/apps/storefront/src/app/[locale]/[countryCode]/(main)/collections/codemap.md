# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/collections/

## Responsibility

Intermediate route aggregate for product collection pages. No page file at this level; serves as the parent path segment for `[handle]` collection routes.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Only contains a `[handle]/` child directory.
- The `collections/` prefix itself is not a valid route; visiting `/fr/collections` results in a 404.

## Child Routes

- `[handle]/` — Individual collection page by handle (e.g. `/fr/collections/all-products`).
