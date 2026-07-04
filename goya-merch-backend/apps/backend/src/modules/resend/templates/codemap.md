# goya-merch-backend/apps/backend/src/modules/resend/templates/

## Responsibility
Email and PDF rendering templates for transactional notifications. Contains three template modules — order confirmation email, shipping notification email, and invoice PDF — each exporting a render function that takes typed data and returns the rendered output.

## Design
- **Template Module Pattern**: Each file exports a typed data interface and an async render function. Templates are standalone modules with no Medusa dependency, allowing independent testing and reuse.
- **React Email Templates**: `order-confirmation.tsx` and `shipping-notification.tsx` use `react-email` components (`Html`, `Body`, `Container`, `Section`, `Heading`, `Text`, `Hr`, `Row`, `Column`, `Button`) with dark theme styling (#0d0d0d background, #1a1a1a cards, white/grayscale text). Rendered to HTML string via `render()`.
- **PDF Template**: `invoice-pdf.tsx` uses `@react-pdf/renderer` with dynamic ESM import via the `getPDFRenderer()` lazy singleton pattern to work around CJS/ESM incompatibility. Renders an A4-format invoice with Helvetica fonts, seller/client address blocks, item table with pricing, VAT breakdown, and payment-acknowledgment footer.
- **French Compliance**: The order confirmation email includes the mandatory French "Droit de rétractation" (14-day withdrawal right) notice per Article L221-18 of the Consumer Code. The invoice PDF includes TVA/VAT handling with small-business exemption display ("TVA non applicable, art. 293B CGI").
- **Currency Formatting**: All monetary values formatted with `Intl.NumberFormat` fr-FR locale.

## Flow
1. Resend notification provider calls `renderOrderConfirmationEmail(data)` or `renderShippingNotificationEmail(data)` for HTML email content.
2. Resend notification provider calls `generateInvoicePDF(data)` for PDF buffer attachment, passing typed `InvoiceData`.
3. Renderers are pure functions — no side effects, no service resolution.

## Integration
- **Parent**: `modules/resend/` — Resend notification provider module.
- **Files**:
  - `invoice-pdf.tsx` — PDF invoice renderer (`generateInvoicePDF`).
  - `order-confirmation.tsx` — Order confirmation HTML email (`renderOrderConfirmationEmail`).
  - `shipping-notification.tsx` — Shipping notification HTML email (`renderShippingNotificationEmail`).
- **Dependencies**: `react-email` for email components, `@react-pdf/renderer` (ESM, dynamic import) for PDF, `react`/`@types/react` (pinned to 18.3).
- **Consumed by**: `modules/resend/index.ts` — the notification provider service.
