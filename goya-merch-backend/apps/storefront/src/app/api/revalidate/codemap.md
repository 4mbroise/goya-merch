# goya-merch-backend/apps/storefront/src/app/api/revalidate/

## Responsibility

On-demand revalidation endpoint triggered by external webhooks (e.g. Medusa CMS updates). Accepts a `POST` request with a `secret` query parameter, then purges the entire page cache via `revalidatePath("/", "layout")`.

## Design

- **Route Handler** (not a page): single `POST` function exported from `route.ts`.
- Guards access with a shared secret (`REVALIDATE_SECRET` env var) passed as a search-param.
- Uses `revalidatePath("/", "layout")` to invalidate the root layout, forcing a full re-render for every visitor regardless of their `cache_id` cookie.
- Returns JSON `{ revalidated: true }` on success, or `401 { message: "Invalid secret" }`.

## Flow

1. External service sends `POST /api/revalidate?secret=<token>`.
2. The handler compares `secret` against `process.env.REVALIDATE_SECRET`.
3. On match, calls `revalidatePath("/", "layout")` and responds `200`.
4. On mismatch, responds `401`.

## Integration

- `next/cache` (`revalidatePath`) — the only consumer of this module.
- Environment variable: `REVALIDATE_SECRET`.
