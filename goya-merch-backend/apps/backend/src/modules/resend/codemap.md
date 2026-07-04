# goya-merch-backend/apps/backend/src/modules/resend/

## Responsibility
Custom notification provider implementing Medusa's `Modules.NOTIFICATION` provider interface. Delivers transactional emails (order confirmation with PDF invoice attachment, shipping notification) via the Resend API, and stores generated invoices to a GitHub repository.

## Design
- **ModuleProvider Pattern**: Uses `ModuleProvider(Modules.NOTIFICATION, { services: [ResendNotificationProvider] })` from `@medusajs/framework/utils` to register a notification provider identified as `"resend"`.
- **Provider Service Contract**: `ResendNotificationProvider` implements `send()` receiving `ProviderSendNotificationDTO` (with `to`, `channel`, `template`, `data`) and returning `ProviderSendNotificationResultsDTO` (with `id`).
- **Template Router**: `send()` switches on `notification.template` — supports `"order.confirmation"` and `"order.shipment_created"`.
- **Invoice PDF Generation**: On order confirmation, generates a PDF invoice using `@react-pdf/renderer` (via dynamic ESM import), uploads it to a GitHub repository via the GitHub Contents API (`github-storage.ts`), and attaches the PDF to the confirmation email.
- **External API Clients**: Uses the `resend` npm SDK for email sending and `fetch()` for GitHub API calls (no SDK).
- **Helper Utilities**: Contains `formatDate()` (fr-FR locale), `formatMoney()` (fr-FR locale, EUR), `toAmount()` (flexible number extraction from Medusa's polymorphic amount fields), and `resolveShippingTotal()` (falls back through shipping amount fields to shipping methods array).
- **Seller Configuration**: Reads seller info (name, address, SIRET, VAT) from environment variables for invoice legal compliance (French TVA rules, article 293B CGI for small-business exemption).

## Flow
1. Notification created via `notificationService.createNotifications()` in subscribers reaches the provider.
2. `sendOrderConfirmation()` extracts order data, builds invoice data model, generates PDF + HTML email in parallel, uploads PDF to GitHub, then sends the email with PDF attachment via Resend API.
3. `sendShippingNotification()` extracts fulfillment tracking info, renders shipping notification HTML, and sends via Resend API.
4. Resend API responses are validated — errors throw to trigger Medusa's notification retry/error handling.

## Integration
- **Parent**: `modules/` — Custom modules directory.
- **Children**:
  - `templates/` — Email and PDF template renderers.
  - `github-storage.ts` — GitHub API client for invoice PDF upload.
- **Registered as**: `"./src/modules/resend"` with id `"resend"` in `medusa-config.ts`, inside the `@medusajs/medusa/notification` module configuration.
- **External APIs**: Resend (email), GitHub Contents API (PDF storage).
- **Consumed by**: `subscribers/order-placed.ts` (via `Modules.NOTIFICATION`, template `"order.confirmation"`), `subscribers/order-shipment-created.ts` (template `"order.shipment_created"`).
