# GOYA Merch — Project Brief

## Foundation
A full e-commerce store for the music band **GOYA**, selling approximately 5 products (t-shirts, vinyl records, accessories). Zero license cost, simply maintained, fully typed TypeScript.

## Core Requirements
- **Backend:** Medusa.js 2.0 (Node.js + TypeScript) with PostgreSQL
- **Frontend:** Next.js 15 (official Medusa DTC starter) with Tailwind CSS
- **Payments:** Stripe (Stripe Invoicing is NOT used — PDFs generated internally via @react-pdf/renderer)
- **Emails:** Resend (transactional emails: order confirmation, shipping notification)
- **Invoice storage:** GitHub private repo (`4mbroise/goya-merch-invoices`)
- **Hosting:** Self-hosted VPS via Coolify (Docker containers)
- **Database:** PostgreSQL (managed via Coolify on VPS)

## Business Constraints
- Zero license cost — everything must be open source or free tier
- Simplicity — no over-engineering for ~5 products
- TypeScript — all custom code must be typed
- No promo codes (promotion module not used)
- France-first — EUR region, French legal pages (CGV, Mentions Légales, Politique de Confidentialité)

## Deployment Architecture
Two Docker containers orchestrated with docker-compose:
- **Backend (Medusa):** Node.js + TypeScript, port 9000
- **Frontend (Next.js):** Next.js 15, port 3000 (calls backend via internal Docker network)
- **PostgreSQL:** Self-hosted on VPS (Coolify-managed or dedicated Docker service)

## Project Repo Structure
```
goya-merch/
├── .clinerules/
│   ├── memory-bank.md          # Instructions for Cline's Memory Bank
│   └── memory-bank/            # Core documentation (this directory)
├── assets/                     # Brand assets (SVG logos, etc.)
├── Plan/                       # Project planning documents
│   ├── overview.md
│   ├── steps.md
│   └── fixes-log.md
├── goya-merch-backend/         # Monorepo (npm workspaces + Turborepo)
│   ├── apps/
│   │   ├── backend/            # Medusa.js 2.0 application (port 9000)
│   │   └── storefront/         # Next.js 15 storefront (DTC starter, port 9001 dev / 3000 prod)
│   ├── turbo.json
│   └── package.json
└── README.md
```

## Current Status
Steps 1-5 complete (Medusa setup, catalog, Stripe, transactional emails/PDFs, frontend customization). Step 6 (Dockerization) is next. Steps 7-8 (Coolify deploy, pre-launch) pending.