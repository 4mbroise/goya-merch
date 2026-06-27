# Step 1 — Local Medusa Setup

## Objective
Bootstrap the Medusa.js 2.0 backend locally and access the admin dashboard.

## Tasks
- [x] Run `create-medusa-app` to scaffold the project
- [x] Review generated folder structure and understand each directory's role
- [x] Start the development server
- [x] Access the admin dashboard (default: `http://localhost:9000/app`)
- [x] Create the first admin account

## Key Commands
```bash
npx create-medusa-app@latest goya-merch-backend
cd goya-merch-backend
npm run dev
```

## Notes
- Medusa 2.0 uses a module-based architecture — each capability (cart, product, customer…) is a standalone module.
- The admin dashboard is bundled by default in dev mode; no separate deploy needed locally.
- PostgreSQL must be running before starting the server. Use a local Docker container for convenience:
  ```bash
  docker run -d --name goya-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:16
  ```

## Common Pitfalls
- Node version must be ≥ 20. Check with `node -v`.
- The `.env` file is required before first start — copy `.env.template` and fill in the database URL.
- First launch runs migrations automatically; wait for them to finish before opening the admin.

---

# Step 2 — Catalog Configuration

## Objective
Create products, variants, collections, and configure regions/currencies.

## Tasks
- [x] Create products via admin UI or a seed script (`/src/scripts/seed-goya-catalog.ts`)
- [x] Add variants per product (size, color)
- [x] Set stock quantities per variant
- [x] Create a collection (e.g. "Collection GOYA 2025")
- [x] Upload product images (use placeholders until final assets are delivered)
- [x] Configure France as primary region, EUR as primary currency
- [x] Set up a flat-rate shipping option for France (manual fulfillment)

## Notes
- Variants are where stock, price, and SKU live — products are just containers.
- A seed script is preferable to manual entry: it is reproducible and version-controlled.
- Collections group products for frontend display; useful for the catalog page.
- Shipping is manual: Medusa records the order and you print/send labels yourself. No third-party fulfillment needed.

## Common Pitfalls
- Prices must be set per region — a product without a price in the active region won't appear in the storefront.
- Images must be hosted (Medusa stores only the URL); use the built-in file module or an S3-compatible bucket.
- Even with manual shipping, **a shipping option must exist in Medusa** for checkout to complete — create at least one flat-rate option.

---

# Step 3 — Stripe Integration

## Objective
Wire up Stripe for payments, enable PDF invoicing, and test a full checkout flow locally.

## Tasks
- [x] Install the official Medusa Stripe plugin
- [x] Add Stripe test keys to `.env`
- [x] Register the plugin in `medusa-config.ts`
- [x] Test a complete purchase with a Stripe test card
- [ ] Switch to production keys before go-live

**Note:** Stripe Invoicing is **not used** — PDFs are generated internally via @react-pdf/renderer and stored in GitHub.

## Key Commands
```bash
npm install @medusajs/payment-stripe
```

## Notes
- Use Stripe test keys (`sk_test_…`, `pk_test_…`) during development; never commit them to git.
- The plugin handles webhook events for payment confirmation — set up the webhook endpoint in the Stripe dashboard pointing to `/hooks/payment/stripe`.
- Stripe CLI can forward webhooks to localhost during dev:
  ```bash
  stripe listen --forward-to localhost:9000/hooks/payment/stripe
  ```
- Stripe Invoicing is enabled in the Stripe dashboard under **Billing → Settings**. It sends a PDF invoice automatically after a successful charge — no extra code needed.

## Common Pitfalls
- Missing or incorrect webhook secret causes orders to stay in "pending" state.
- Stripe requires HTTPS for production webhooks — handled automatically by Coolify (Traefik + Let's Encrypt).
- Remember to switch Stripe Invoicing to live mode alongside the payment keys.

---

# Step 4 — Transactional Emails

## Objective
Send order confirmation and shipping notification emails.

## Tasks
- [x] Configure Resend as the notification provider
- [x] Create Resend notification module with INotificationProvider
- [x] Create order confirmation email template (react-email)
- [x] Create shipping notification email template with tracking button
- [x] Create PDF invoice template (@react-pdf/renderer)
- [x] Wire subscribers to Medusa events (order.placed, order.shipment_created)
- [x] Set up GitHub invoice storage (goya-merch-invoices repo)
- [x] Create invoice DB model for audit trail + sequencing
- [ ] Test both email flows end-to-end locally

## Notes
- Resend has a generous free tier (3 000 emails/month) and a clean API.
- Medusa 2.0 uses Notification Providers — implement the `INotificationProvider` interface.
- Templates can be written as React Email components for easy styling.

## What Was Built
- **Resend Notification Provider** (`src/modules/resend/`) — listens to Medusa events and sends emails
- **Order Confirmation Email** — dark-themed, includes 14-day withdrawal notice (French law)
- **Shipping Notification Email** — includes tracking number + "Suivre mon colis" button
- **PDF Invoice Generator** — French-compliant (TVA, SIRET, invoice number)
- **GitHub Storage** — invoices stored in private repo `4mbroise/goya-merch-invoices` under `invoices/YYYY/MM/GOYA-MERCH-XXXX.pdf`
- **Invoice DB Table** — sequential numbering persisted across restarts, 10-year audit trail

## Before Testing
1. Add GitHub token to `.env`: `INVOICE_GITHUB_TOKEN=your_pat_here`
2. Fill seller info: `SELLER_ADDRESS`, `SELLER_CITY`, `SELLER_SIRET` (optional), `SELLER_TVA_EXEMPT` or `SELLER_TVA_NUMBER`
3. Run migrations: `medusa db:migrate` (auto on `npm run dev`)
4. For production: use verified Resend domain in `RESEND_FROM_ADDRESS`
5. Ensure GitHub repo is private and PAT has `repo` access

## Common Pitfalls
- Invoice numbering resets on restart without DB persistence (now fixed — reads last number from DB)
- GitHub token must have `repo` scope, not just `public_repo`
- Resend sandbox address (`onboarding@resend.dev`) works for testing before domain verification
- **Monetary amounts are in cents**: Medusa stores all money as integers in minor units (e.g. €30.00 = `3000`). Every display helper (`convertToLocale` on the storefront, `formatMoney` on the backend) must divide by 100 before passing to `Intl.NumberFormat`. Skip division only for zero-decimal currencies (KRW). See `Plan/fixes-log.md` for the full detail.

---

# Step 5 — Next.js Frontend Customization

## Objective
Clone the official Medusa Next.js starter and adapt it to GOYA's dark visual identity.

## Tasks
- [ ] Clone `medusa-next-js-starter` and point it at the local backend
- [ ] Set dark theme as default in Tailwind config (dark backgrounds, light text)
- [ ] Update color palette and typography to match GOYA's aesthetic
- [ ] Add logo placeholder (replace with final SVG/PNG once assets are delivered)
- [ ] Add favicon placeholder
- [ ] Customize the homepage hero section with band name and dark imagery
- [ ] Verify catalog, product, cart, and checkout pages

## Key Commands
```bash
npx create-next-app@latest --example https://github.com/medusajs/nextjs-starter-medusa goya-merch-frontend
```

## Notes
- The starter uses Tailwind CSS — visual changes are mostly confined to `tailwind.config.js` and component files.
- For a dark theme, define dark colors directly as the default palette in Tailwind (no need for `darkMode: 'class'` toggle).
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` in `.env.local` must point to the running backend.
- Logo assets are pending — design the layout to accept an image or SVG so swapping it later requires only one file change.

## Common Pitfalls
- CORS must be configured on the backend to allow the Next.js origin (`storeCors` in `medusa-config.ts`).
- Next.js Image component requires adding the image host to `next.config.js` `remotePatterns`.

---

# Step 6 — Dockerization

## Objective
Package the backend and frontend as Docker containers and orchestrate them with `docker-compose`.

## Tasks
- [ ] Write `Dockerfile` for the Medusa backend
- [ ] Write `Dockerfile` for the Next.js frontend
- [ ] Write `docker-compose.yml` at the repo root
- [ ] Add a local PostgreSQL service to `docker-compose.yml` (dev only)
- [ ] Verify the full stack starts with `docker compose up`
- [ ] Test a complete purchase inside the containerized stack
- [ ] Add `.dockerignore` files for both services (exclude `node_modules`, `.env`, `.next`)

## File Structure
```
goya-merch/
├── goya-merch-backend/
│   ├── Dockerfile
│   └── .dockerignore
├── goya-merch-frontend/
│   ├── Dockerfile
│   └── .dockerignore
└── docker-compose.yml
```

## Backend Dockerfile (outline)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
EXPOSE 9000
CMD ["npm", "run", "start"]
```

## Frontend Dockerfile (outline)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```
> Requires `output: 'standalone'` in `next.config.js`.

## docker-compose.yml (outline)
```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
    volumes:
      - pgdata:/var/lib/postgresql/data

  backend:
    build: ./goya-merch-backend
    ports:
      - "9000:9000"
    env_file: ./goya-merch-backend/.env
    depends_on:
      - postgres

  frontend:
    build: ./goya-merch-frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_MEDUSA_BACKEND_URL: http://backend:9000
    depends_on:
      - backend

volumes:
  pgdata:
```

## Notes
- The `frontend` container references `backend` by its service name — Docker's internal DNS resolves it automatically.
- The `postgres` service in `docker-compose.yml` is for **local dev only**; in production PostgreSQL runs as a separate Coolify service on the VPS.
- Use `env_file` to keep secrets out of `docker-compose.yml`; never commit `.env` files.

## Common Pitfalls
- Medusa runs database migrations on startup — the backend must wait for PostgreSQL to be ready. Add a `healthcheck` on the `postgres` service and `condition: service_healthy` on the `backend` depends_on.
- `NEXT_PUBLIC_*` variables are baked in at build time in Next.js — pass them as `ARG` in the Dockerfile if the backend URL differs between environments.
- The standalone Next.js output copies only production dependencies; make sure `sharp` is listed in `dependencies` (not `devDependencies`) for image optimization.

---

# Step 7 — Coolify Deployment (VPS)

## Objective
Deploy the Docker containers to a self-hosted VPS using Coolify, with a self-managed PostgreSQL instance.

## How Coolify works
Coolify is an open-source self-hosted PaaS that manages Docker deployments on your VPS. It handles:
- Building images from your `Dockerfile` (or `docker-compose.yml`)
- Environment variable management
- Reverse proxy (Traefik) with automatic HTTPS via Let's Encrypt
- PostgreSQL as a managed database service

## Tasks
- [ ] Install Coolify on the VPS (single command install)
- [ ] Create a PostgreSQL database resource in Coolify; note the internal connection string
- [ ] Create a new project in Coolify for GOYA Merch
- [ ] Add the backend as a Docker service, pointing to the backend `Dockerfile`
- [ ] Add the frontend as a Docker service, pointing to the frontend `Dockerfile`
- [ ] Set all required environment variables in each Coolify service
- [ ] Deploy both services and verify migrations run on first backend startup
- [ ] Assign custom domain(s) in Coolify — HTTPS is provisioned automatically

## Coolify Install (on the VPS)
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```
Then open `http://<your-vps-ip>:8000` to complete setup.

## Required Environment Variables — Backend
```
DATABASE_URL          # internal Coolify PostgreSQL URL (e.g. postgresql://user:pass@postgres:5432/goya)
JWT_SECRET
COOKIE_SECRET
STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
RESEND_API_KEY
STORE_CORS            # public frontend URL
ADMIN_CORS            # public admin URL
```

## Required Environment Variables — Frontend
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL   # public backend URL (used by the browser)
```

## Notes
- `JWT_SECRET` and `COOKIE_SECRET` must be long random strings: `openssl rand -hex 32`.
- Coolify's internal network lets the backend reach PostgreSQL by service name — use the internal URL for `DATABASE_URL` to avoid going through the public internet.
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` must be the **public** HTTPS URL of the backend, not the internal one, because Next.js embeds it at build time and browsers use it directly.
- Coolify can redeploy automatically on `git push` via a webhook — set this up to streamline updates.

## Common Pitfalls
- Make sure port 80 and 443 are open on the VPS firewall (ufw/iptables) before deploying — Traefik needs them for HTTPS.
- `NEXT_PUBLIC_*` variables are baked in at build time; if the backend URL changes, the frontend image must be rebuilt.
- Remember to add the frontend URL to `STORE_CORS` and the admin URL to `ADMIN_CORS` after the first deploy.

---

# Step 8 — Pre-Launch Checklist

## Objective
Verify everything works end-to-end in production before going live.

## Checklist
- [ ] Switch Stripe keys from test to live (`sk_live_…`, `pk_live_…`)
- [ ] Update Stripe webhook endpoint to production URL
- [ ] Switch Stripe Invoicing to live mode
- [ ] Complete a full purchase with a real card (small amount)
- [ ] Confirm order confirmation email is received
- [ ] Confirm shipping email sends correctly
- [ ] Verify PDF invoice is generated by Stripe
- [ ] Check all meta tags (`<title>`, `description`, `og:image`) on key pages
- [ ] Add French legal pages: CGV, Mentions Légales, Politique de Confidentialité
- [ ] Test on mobile (checkout especially)
- [ ] Verify admin dashboard is accessible on Coolify-assigned URL
- [ ] Purchase and configure custom domain

## Common Pitfalls
- Forgetting to update the Stripe webhook URL after switching to production keys.
- `og:image` must be an absolute URL, not a relative path.
- French law requires CGV, Mentions Légales, and Politique de Confidentialité for any online store selling to French customers. These must be accessible from the footer before launch.
