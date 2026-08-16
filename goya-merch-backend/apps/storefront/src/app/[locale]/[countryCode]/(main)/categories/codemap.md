# goya-merch-backend/apps/storefront/src/app/[countryCode]/(main)/categories/

## Responsibility

Intermediate route aggregate for product category browsing. No page file at this level; serves as a parent path for the catch-all category segment.

## Design

- **Route aggregate** — no `page.tsx`, `layout.tsx`, or `loading.tsx`. Contains only a `[...category]/` catch-all segment.
- The `categories/` prefix itself is not a valid route; attempting to visit `/fr/categories` results in a 404.

## Child Routes

- `[...category]/` — Catch-all dynamic segment for multi-level category paths (e.g. `/fr/categories/clothing/shirts`).
