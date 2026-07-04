# goya-merch-backend/apps/backend/src/

## Responsibility
Source root for the Medusa.js 2.0 backend application. Organizes all custom application code — modules, API routes, event subscribers, workflows, scripts, admin widgets, jobs, links, and migration scripts — following Medusa 2.0 conventions.

## Design
- **Medusa Convention Layout**: Each subdirectory maps to a Medusa extension point — `api/` for custom routes, `subscribers/` for event handlers, `modules/` for custom module definitions, `workflows/` for custom workflows, `admin/` for admin dashboard widgets and i18n.
- **File-based API Routing**: Routes in `api/admin/` and `api/store/` are auto-discovered by Medusa using the file path as the URL path; `custom/` directories hold bespoke endpoints.
- **Module Pattern**: `modules/` contains two custom modules — `invoice` (a MedusaModule providing a service+model) and `resend` (a ModuleProvider implementing the NOTIFICATION provider interface).
- **Event-Driven Side Effects**: `subscribers/` hooks into Medusa lifecycle events to trigger notifications, invoice creation, and cache revalidation.

## Flow
1. Medusa runtime scans `src/` at startup, registering: API routes, subscribers, workflows, admin widgets, and modules.
2. Modules in `medusa-config.ts` are instantiated by the Medusa DI container and injected into subscribers and API handlers via `container.resolve()`.
3. API routes (store and admin) handle HTTP requests, using the DI container to access services and modules.
4. Subscribers listen to internal Medusa events and perform side-effects via resolved services.

## Integration
- **Parent**: `apps/backend/` — compiles via `tsconfig.json` (Node16 module, outputs to `.medusa/server`).
- **Children**:
  - `api/` — Custom REST API route handlers (admin and store).
  - `admin/` — Admin dashboard widget definitions and i18n extensions.
  - `modules/` — Custom Medusa modules (invoice, resend notification provider).
  - `subscribers/` — Event subscribers handling order lifecycle and product changes.
  - `workflows/` — Custom workflow definitions (currently empty).
  - `scripts/` — One-off executable scripts (`medusa exec`).
  - `migration-scripts/` — Data seed run as part of migration pipeline.
  - `jobs/` — Scheduled job definitions (currently empty).
  - `links/` — Custom link definitions (currently empty).
