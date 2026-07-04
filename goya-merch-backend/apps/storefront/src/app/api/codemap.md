# goya-merch-backend/apps/storefront/src/app/api/

## Responsibility

Route group for server-side API endpoints that are not part of the Medusa backend. Currently contains a single `revalidate` endpoint for cache invalidation.

## Design

- Uses the Next.js Route Handlers convention (`route.ts` files) — no page components.
- All routes in this subtree are prefixed with `/api/` and bypass the `[countryCode]` dynamic segment.

## Flow

- Requests to `/api/*` are handled exclusively by Route Handlers; they do not render React components.
- The root `/api/` directory has no `page.tsx` — only subdirectories with `route.ts`.

## Integration

- Currently contains one child: `revalidate/` which calls `next/cache` and reads `process.env.REVALIDATE_SECRET`.
