# goya-merch-backend/apps/backend/src/api/admin/custom/

## Responsibility
Custom admin API endpoint providing application-specific functionality beyond Medusa's built-in admin API. Currently a health/liveness check endpoint for the admin namespace.

## Design
- **Single-file Route Handler Pattern**: `route.ts` exports one or more HTTP method handler functions (`GET`, `POST`, etc.) following Medusa's file-based routing convention.
- **Stub Implementation**: A single `GET` handler exists that responds with HTTP 200 (empty body), serving as a readiness probe or placeholder for future admin functionality.

## Flow
1. `GET /admin/custom` is registered by Medusa at startup.
2. Handler receives `MedusaRequest` and `MedusaResponse`, immediately responds with `res.sendStatus(200)`.
3. No business logic, no service resolution — purely a placeholder endpoint.

## Integration
- **Parent**: `api/admin/` — Admin API route namespace.
- **Dependencies**: `@medusajs/framework/http` for `MedusaRequest` and `MedusaResponse` types.
- **Accessible at**: `GET /admin/custom` with admin authentication.
