# goya-merch-backend/apps/backend/src/api/

## Responsibility
Custom REST API route definitions extending Medusa's default API surface. Provides additional endpoints under `/admin` and `/store` namespaces for application-specific functionality.

## Design
- **File-based Routing Convention**: Mirrors Medusa 2.0's convention where the directory structure under `api/` maps directly to URL paths. Files named `route.ts` export HTTP method handlers (`GET`, `POST`, `PUT`, `DELETE`).
- **Namespace Separation**: Routes are organized into `admin/` (authenticated, admin-only) and `store/` (public-facing, storefront-accessible) subdirectories.
- **Handler Pattern**: Each route handler receives typed `MedusaRequest` and `MedusaResponse` from `@medusajs/framework/http`, with the Medusa DI container accessible via `req.scope` or direct resolution.

## Flow
1. Medusa server scans `src/api/` at startup, registering all discovered route files.
2. Inbound HTTP requests are matched against registered routes; matched handlers receive the request context with DI container access.
3. Handlers can resolve services, modules, and query utilities via `req.scope.resolve()` to perform business logic.
4. Standard Medusa middleware (auth, CORS, error handling) applies based on the route namespace.

## Integration
- **Parent**: `src/` — Main source tree.
- **Children**:
  - `admin/` — Admin-only API routes (authenticated).
  - `store/` — Public storefront API routes.
- **Consumed by**: Storefront and admin dashboard HTTP clients, external integrations.
