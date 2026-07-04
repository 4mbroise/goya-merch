# goya-merch-backend/apps/

## Responsibility
Container directory for the two Turborepo workspace applications: the Medusa.js backend (headless commerce API) and the Next.js storefront (customer-facing UI).

## Design
- **Workspace Layout**: Each subdirectory is an independent npm package with its own `package.json`, `tsconfig.json`, and build pipeline, composed by the root Turborepo config.
- **Decoupled Architecture**: Backend exposes a REST/store API consumed by the storefront via `@medusajs/js-sdk`; the two communicate over HTTP (internal Docker network in production).

## Flow
1. Turborepo resolves `apps/backend` and `apps/storefront` as workspaces.
2. Backend starts (`medusa develop`, :9000) and serves the store/admin APIs + Stripe webhook endpoint.
3. Storefront starts (`next dev`, :9001) and calls the backend using `NEXT_PUBLIC_MEDUSA_BACKEND_URL` + a publishable API key.

## Integration
| App | Package | Port (dev) | Port (prod) | Detailed Map |
|-----|---------|------------|-------------|--------------|
| Backend (Medusa) | `@dtc/backend` | 9000 | 9000 | [View Map](backend/codemap.md) |
| Storefront (Next.js) | `@dtc/storefront` | 9001 | 3000 | [View Map](storefront/codemap.md) |

- **Shared contract**: Medusa store API + publishable key; Stripe payment session; Resend transactional emails triggered by backend subscribers.
