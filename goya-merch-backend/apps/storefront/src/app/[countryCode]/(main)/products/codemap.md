# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/products/

## Responsibility

Intermediate route aggregate for individual product detail pages. No page file at this level; serves as the parent path segment for `[handle]` product routes.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Only contains a `[handle]/` child directory.
- The `products/` prefix itself is not a valid route; visiting `/fr/products` results in a 404.

## Child Routes

- `[handle]/` — Individual product detail page by handle (e.g. `/fr/products/goya-tshirt`).
