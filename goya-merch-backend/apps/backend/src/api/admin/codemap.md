# goya-merch-backend/apps/backend/src/api/admin/

## Responsibility
Admin-only custom API route namespace for the Medusa dashboard. Provides authenticated endpoints under the `/admin` path prefix for admin-panel-specific operations.

## Design
- **Medusa Admin Route Convention**: Follows Medusa 2.0's file-based routing where `src/api/admin/**/route.ts` files auto-register as `/admin/**` endpoints.
- **Authentication**: All routes in this namespace are automatically protected by Medusa's admin authentication middleware (JWT session or API token).
- **CORS**: Admin CORS origin is configured via `ADMIN_CORS` env var in `medusa-config.ts`.

## Flow
1. Medusa server mounts routes from `src/api/admin/` at startup.
2. Requests are authenticated against the admin JWT strategy; unauthorized requests receive a 401.
3. Handlers receive `MedusaRequest`/`MedusaResponse` and can access the DI container for services and modules.

## Integration
- **Parent**: `api/` — Root API directory.
- **Child**: `custom/` — Custom admin endpoint(s) for application-specific logic.
- **Secured by**: Medusa admin authentication middleware (JWT token in `Authorization` header or cookie).
