# goya-merch-backend/apps/backend/src/api/store/

## Responsibility
Public storefront custom API route namespace. Provides endpoints under the `/store` path prefix for storefront-specific operations accessible to end customers.

## Design
- **Medusa Store Route Convention**: Follows Medusa 2.0's file-based routing where `src/api/store/**/route.ts` files auto-register as `/store/**` endpoints.
- **Public Access**: Routes in this namespace are publicly accessible (CORS configured via `STORE_CORS` env var). No authentication is required by default.
- **Namespace Purpose**: Intended for custom storefront operations not covered by Medusa's default store API (e.g., custom product queries, loyalty, localized content).

## Flow
1. Medusa server mounts routes from `src/api/store/` at startup.
2. Requests pass through store CORS middleware; no authentication enforced.
3. Handlers receive `MedusaRequest`/`MedusaResponse` with DI container access.

## Integration
- **Parent**: `api/` — Root API directory.
- **Child**: `custom/` — Custom store endpoint(s) for application-specific logic.
- **Consumed by**: Next.js storefront and external storefront clients.
