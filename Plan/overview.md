# GOYA Merch — Project Overview

## Goal

Build a full e-commerce store for **GOYA** (music band) selling ~5 products (t-shirts, vinyl records, accessories). The store must have zero license cost, be simple to maintain, and be fully typed in TypeScript.

## Brand & Identity

- **Band name**: GOYA
- **Visual theme**: Dark (dark backgrounds, high contrast)
- **Logo / assets**: Not yet available — placeholders used until delivered
- **Primary market**: France (EUR)
- **Domain**: Dedicated domain to be purchased (not yet chosen)

## Stack

| Layer        | Technology                           |
|-------------|---------------------------------------|
| Backend      | Medusa.js 2.0 (Node.js + TypeScript)  |
| Database     | PostgreSQL                            |
| Frontend     | Next.js 15 (official Medusa starter)  |
| Payments     | Stripe (+ Stripe Invoicing for PDFs)  |
| Hosting      | VPS + Coolify (self-hosted)           |
| Emails       | Resend (fallback: Nodemailer)         |
| Deployment   | Docker (one container per service)    |

## Deployment Architecture

Two Docker containers, orchestrated with `docker-compose`:

```
┌─────────────────────┐     ┌─────────────────────┐
│  backend (Medusa)   │     │  frontend (Next.js)  │
│  Node.js + TS       │◄────│  Next.js 15          │
│  port 9000          │     │  port 3000           │
└────────┬────────────┘     └─────────────────────┘
         │
┌────────▼────────────┐
│  PostgreSQL         │
│  (Railway managed)  │
└─────────────────────┘
```

- `backend`: Medusa.js app, exposes port 9000
- `frontend`: Next.js app, exposes port 3000, calls backend via internal Docker network
- PostgreSQL is self-hosted on the VPS, managed via Coolify (or a dedicated Docker service)

## Features

### Backend
- Product catalog with variants (sizes, colors)
- Per-variant stock management
- Customer accounts (sign-up, login, order history)
- Full Stripe checkout flow with automatic PDF invoices (Stripe Invoicing)
- Manual shipping management (labels printed by hand, flat-rate or free threshold TBD)
- Admin dashboard for orders and products
- Transactional emails (order confirmation, shipping with tracking number)

### Frontend
- Homepage with GOYA dark-themed hero section
- Product catalog page
- Product page with variant selector
- Cart and checkout
- Customer area (account, order history)

## Constraints

- **Zero license cost**: everything must be open source or free tier
- **Simplicity**: no over-engineering for ~5 products
- **TypeScript**: all custom code must be typed
- **Clarity**: every command and config file must be explained, not just shown
- **Common pitfalls**: flag classic mistakes at each step
- **No promo codes**: promotion module will not be used
- **France-first**: EUR region, French legal pages (CGV, Mentions Légales, Politique de Confidentialité)
