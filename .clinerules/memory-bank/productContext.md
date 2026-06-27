# Product Context

## Why This Project Exists
GOYA is a music band that needs a direct-to-consumer ecommerce store to sell their merchandise (t-shirts, vinyl records, accessories). The store replaces any third-party marketplace with a self-hosted, custom-branded shopping experience.

## Problems It Solves
- **No intermediary** — customers buy directly from the band, maximizing margin
- **Full control** — branding, pricing, shipping, and customer relationships are owned entirely by GOYA
- **France-first compliance** — built from the ground up for French consumers (EUR pricing, French legal pages, French-compliant invoices with TVA/SIRET)
- **Zero operational cost** — open source stack means no monthly platform fees

## How It Should Work
1. **Customers** browse a light-themed catalog (white product cards for max contrast with black merch), add items to cart, and check out via Stripe (credit card)
2. **After purchase**, they receive an order confirmation email with a PDF invoice attached
3. **When shipped**, they receive a shipping notification with a tracking link
4. **The band** manages orders through the Medusa admin dashboard, prints shipping labels manually
5. **Invoices** are stored permanently in a private GitHub repo for 10-year audit trail compliance

## User Experience Goals
- **Light base + dark Hero** — product pages and grid use light surfaces (white/grey) so black t-shirts on transparent PNGs have maximum contrast; the homepage Hero is deep dark (#0A0A0A) with a white (#F2F2F2) wordmark for a striking band identity
- **Simple & fast** — 5 products means the UX should be streamlined, not overwhelming
- **Mobile-friendly** — checkout must work smoothly on mobile devices
- **Trustworthy** — clear legal pages, secure Stripe payments, professional invoices and emails
- **Low maintenance** — once deployed, the system should run with minimal intervention