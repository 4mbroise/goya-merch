# goya-merch-backend/apps/backend/src/api/store/custom/

## Responsibility
Custom public store API endpoint for application-specific storefront functionality. Currently a health/liveness check endpoint exposed to the public storefront namespace.

## Design
- **Single-file Route Handler Pattern**: `route.ts` exports HTTP method handler functions following Medusa's file-based routing convention.
- **Stub Implementation**: A single `GET` handler responds with HTTP 200 (empty body), serving as a readiness probe or placeholder for future storefront custom API logic.

## Flow
1. `GET /store/custom` is registered by Medusa at startup.
2. Handler receives `MedusaRequest` and `MedusaResponse`, immediately responds with `res.sendStatus(200)`.
3. No business logic — purely a placeholder endpoint.

## Integration
- **Parent**: `api/store/` — Store API route namespace.
- **Dependencies**: `@medusajs/framework/http` for `MedusaRequest` and `MedusaResponse` types.
- **Accessible at**: `GET /store/custom` (public, no authentication).
