# goya-merch-backend/

## Responsibility
Turborepo monorepo root for the GOYA Merch e-commerce platform. Orchestrates two npm workspace apps — a Medusa.js 2.0 backend and a Next.js 15 storefront — with shared dependency overrides pinning React 18 across the tree.

## Design
- **Monorepo Pattern**: npm workspaces (`apps/**`, excluding `.medusa/**`) coordinated by Turborepo (`turbo.json`).
- **Task Pipeline**: `build` depends on upstream `^build` with cached outputs (`dist/**`, `.next/**`); `dev` is persistent/uncached; `seed` is a custom task for catalog seeding.
- **Dependency Overrides**: `package.json` `overrides` + `pnpm.overrides` pin `react`/`react-dom`/`@types/react` to 18.3.1 to resolve version conflicts between Medusa admin (React 18) and the Next.js storefront.
- **Package manager**: npm 10.8.2 (overrides field used instead of pnpm despite the `pnpm.overrides` legacy field).

## Flow
1. `npm install` at root installs all workspace dependencies with unified React versions.
2. `npm run dev` → `turbo dev` runs both apps in parallel (backend on :9000, storefront on :9001).
3. `npm run backend:dev` / `storefront:dev` filter to a single workspace via `turbo dev --filter=@dtc/<app>`.
4. `npm run backend:seed` → `turbo seed --filter=@dtc/backend` runs catalog/stock seed scripts.
5. `npm run build` → `turbo build` builds backend (`medusa build` → `dist/`) then storefront (`next build` → `.next/`).

## Integration
- **Workspaces**: `apps/backend` (`@dtc/backend`), `apps/storefront` (`@dtc/storefront`).
- **External**: PostgreSQL (DATABASE_URL), Stripe API, Resend API, GitHub (invoice storage PAT).
- **Deployment**: Two Docker containers (backend :9000, storefront :3000 prod) on a self-hosted VPS via Coolify.
- See [apps/ codemap](apps/codemap.md) for the app-level breakdown.
