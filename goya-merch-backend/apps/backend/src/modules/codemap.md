# goya-merch-backend/apps/backend/src/modules/

## Responsibility
Container for custom Medusa 2.0 module definitions. Houses two modules — `invoice` (a MedusaModule providing a data model and CRUD service) and `resend` (a ModuleProvider implementing the notification provider interface for email delivery).

## Design
- **Medusa Module Pattern**: Two distinct module types per Medusa 2.0 conventions:
  - `invoice/` — Full MedusaModule with a MikroORM model, migration, and auto-generated service via `MedusaService`.
  - `resend/` — ModuleProvider implementing the `Modules.NOTIFICATION` provider contract, registered via `ModuleProvider`.
- **Separation of Concerns**: Business capabilities are isolated into self-contained directories, each with its own models, migrations, services, and (for resend) email templates and external API clients.

## Flow
1. `medusa-config.ts` registers both modules with `resolve: "./src/modules/invoice"` and `resolve: "./src/modules/resend"`.
2. Medusa's DI container instantiates each module, applies MikroORM migrations for the invoice module, and exposes the module's service via `container.resolve(INVOICE_MODULE)` or through the notification provider channel.
3. Subscribers resolve the invoice and notification modules to trigger invoice creation and email delivery on order lifecycle events.

## Integration
- **Parent**: `src/` — Main source tree.
- **Children**:
  - `invoice/` — Invoice module (MedusaModule with model, migration, service).
  - `resend/` — Resend notification provider (ModuleProvider for `Modules.NOTIFICATION`).
- **Registered in**: `medusa-config.ts` as top-level modules.
