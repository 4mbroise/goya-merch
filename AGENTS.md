# AGENTS.md

## Repository Map

A full codemap is at `codemap.md` in the project root, with per-folder `codemap.md` files. Read it before any non-trivial task for architecture, entry points, and data flow.

Further context (written for Cline, but accurate):
- `.clinerules/memory-bank/techContext.md` — env vars, ports, ESM/CJS interop
- `.clinerules/memory-bank/activeContext.md` — work status and design decisions
- `Plan/fixes-log.md` — root-cause notes for the money-unit and CJS/ESM build fixes

## Monorepo Layout

- **Git root is the repo root, but the npm/Turborepo workspace root is `goya-merch-backend/`.** Run all `npm`/`turbo`/`medusa` commands from `goya-merch-backend/` (or the relevant `apps/*`).
- Two workspaces under `goya-merch-backend/apps/`: `@dtc/backend` (Medusa 2.0, CJS) and `@dtc/storefront` (Next.js 15 App Router). Workspaces exclude `apps/backend/.medusa/**`.

## Toolchain — npm, not pnpm

- Package manager is **npm 10.8.2**. The upstream `goya-merch-backend/README.md` says `pnpm` and the root `package.json` has a `pnpm.overrides` block — both are inert boilerplate; `pnpm.overrides` does nothing under npm. React 18 is pinned via the `overrides` field.
- Node ≥20.
- Do **not** upgrade React past 18.3.1 or `@types/react` past 18.3.12 (Medusa admin + storefront compat). A hoisted `@types/react@19` broke the build before — see `Plan/fixes-log.md` Fix 3.

## Common Commands

From `goya-merch-backend/`:
- `npm install` — install workspaces
- `npm run dev` — both apps (backend :9000, storefront :9001)
- `npm run backend:dev` / `npm run storefront:dev` — one app only
- `npm run build` / `npm run lint` / `npm run test`

Backend (`apps/backend/`):
- `npm run dev` — `medusa develop` on :9000 (runs migrations on start)
- `npm run stripe:listen` — forwards Stripe webhooks to `localhost:9000/hooks/payment/stripe_stripe`
- `npm run test:unit` / `test:integration:http` / `test:integration:modules`

Storefront (`apps/storefront/`):
- `npm run dev` — `next dev --turbopack -p 9001`
- `npm run lint` — `next lint`
- `npm run analyze` — bundle analysis

## Testing Gotchas

- Tests are gated by the `TEST_TYPE` env var (set by the three `test:*` scripts). Running `jest` directly matches nothing — each script selects a different `testMatch` glob (see `jest.config.js`).
- Tests need `NODE_OPTIONS=--experimental-vm-modules` (already in the scripts) and run `--runInBand --forceExit`.
- **`jest.config.js` lists `./integration-tests/setup.js` as a setupFile, but the `integration-tests/` directory is not in the repo.** The integration scripts fail at setup until that file is restored or the `setupFiles` entry is removed.

## Seeding — use `medusa exec`, not `npm run backend:seed`

- The root `backend:seed` script runs `turbo seed --filter=@dtc/backend`, but `@dtc/backend` defines no `seed` script — it is a no-op. Seed directly:
  - `npx medusa exec ./src/scripts/seed-goya-catalog.ts` — idempotent (guards on `collection-goya-2025`)
  - `npx medusa exec ./src/scripts/seed-goya-stock.ts` — run after the catalog seed
- Foundational data (regions, shipping, sales channels) lives in `src/migration-scripts/initial-data-seed.ts` and runs via the `npx medusa db:migrate` lifecycle.
- Create an admin user with `npx medusa user -e <email> -p <password>`.

## Money — major units, never divide by 100

- Medusa 2.x `amount` fields are **major units** (`30` = €30.00), not cents. Display helpers pass the raw amount to `Intl.NumberFormat` with **no `/100`**. Seed data uses major units. Stripe converts to cents internally.
- Do not "fix" raw-looking prices by adding `/100` — this was a real bug that rendered prices 100× too small (see `Plan/fixes-log.md` Fix 2).

## ESM/CJS — dynamic-import `@react-pdf/renderer`

- The backend is CJS; `@react-pdf/renderer` is ESM-only. Static `import` breaks the build. Always load it via dynamic `import()` inside an async function — see the `getPDFRenderer()` pattern in `src/modules/resend/templates/invoice-pdf.tsx`.

## Storefront Build Skips Checks

- `next.config.js` sets `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors`. A green `npm run build` does **not** mean code is clean — run `npm run lint` and `tsc --noEmit` separately. Images are `unoptimized: true`.

## Environment

- Env files are gitignored. Backend: `cp apps/backend/.env.template apps/backend/.env`. Storefront: `cp apps/storefront/.env.template apps/storefront/.env.local`.
- The backend `.env.template` is minimal (CORS, secrets, empty `DATABASE_URL`). You must add `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `INVOICE_GITHUB_TOKEN`, and seller fields (`SELLER_SIRET`, `SELLER_ADDRESS`, `SELLER_TVA_EXEMPT`/`SELLER_TVA_NUMBER`) manually. Full list in `.clinerules/memory-bank/techContext.md`.
- Storefront enforces only `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` (via `check-env-variables.js`, exits if missing). Also set `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_DEFAULT_REGION` (`fr`), `NEXT_PUBLIC_BASE_URL`.

## Ports

- Backend: 9000 (dev and prod).
- Storefront: 9001 (dev with `--turbopack`, and prod via `next start -p 9001`). Some docs say 3000 or 8000 — the actual `start` script now uses 9001.

## Architecture Quick Facts

- Backend business logic lives in **event subscribers** (`src/subscribers/`: `order.placed`, `order.shipment_created`, `product.updated`). The `workflows/` directory is empty.
- Custom modules: `src/modules/invoice` (sequential invoice numbers `GOYA-MERCH-NNNN`, DB-derived, **non-atomic — known race condition**) and `src/modules/resend` (notification provider: email + PDF invoice, uploads to GitHub repo `4mbroise/goya-merch-invoices` via PAT).
- Storefront routes are localized via a `[countryCode]` segment mapping to Medusa regions; `<html lang="fr">` is hardcoded (France-first: EUR, French legal pages required — CGV, Mentions Légales, Politique de Confidentialité).
- Storefront calls the backend via `@medusajs/js-sdk`; mutations revalidate via Next.js cache tags → `POST /api/revalidate`.

## Known Issues

See `codemap.md` for the full list. Most likely to bite:
- Invoice numbering race condition (no transaction lock).
- `updateCustomerEmail` / `updatePassword` server actions are no-ops.
- Copy-paste naming bugs: `profile-phone/index.tsx` exports `ProfileEmail`; `bancontact.tsx` exports `Ideal`.
