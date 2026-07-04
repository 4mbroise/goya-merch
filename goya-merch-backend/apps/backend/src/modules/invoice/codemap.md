# goya-merch-backend/apps/backend/src/modules/invoice/

## Responsibility
Custom MedusaModule for managing PDF invoice records. Provides a database-backed service to create, list, and query invoices — one invoice per placed order — with fields for invoice numbering, customer info, totals, and file storage references.

## Design
- **MedusaModule Pattern**: Uses the `Module()` decorator from `@medusajs/framework/utils` to define a module with a unique identifier (`INVOICE_MODULE = "invoiceModule"`) and an auto-generated service class.
- **Service Layer**: `InvoiceModuleService` extends `MedusaService({ Invoice })`, which auto-generates CRUD methods (`listInvoices`, `createInvoices`, etc.) from the registered model.
- **Model Definition**: Uses Medusa's `model.define()` DSL — a MikroORM entity wrapper with fields: `id`, `invoice_number` (unique), `order_id`, `customer_email`, `customer_name`, `total_ttc`, `currency_code`, `file_key`, `file_url` (nullable), `issued_at`, plus auto-managed timestamps (`created_at`, `updated_at`, `deleted_at`).
- **Soft Delete**: Model includes a `deleted_at` column for soft deletion, indexed with a partial unique index on `invoice_number`.

## Flow
1. Module is registered in `medusa-config.ts` and instantiated by the Medusa DI container.
2. On `order.placed` event, the subscriber creates an invoice record via `invoiceModuleService.createInvoices()` with the next sequential invoice number.
3. Later, when the order confirmation email is sent, the Resend provider queries (implicitly) or updates the invoice record with the GitHub file URL.
4. Invoices can be listed/queried for admin display or reporting.

## Integration
- **Parent**: `modules/` — Custom modules directory.
- **Children**:
  - `models/` — MikroORM entity definition (`Invoice`).
  - `migrations/` — Database migration for the invoice table.
- **Registered as**: `"./src/modules/invoice"` in `medusa-config.ts`.
- **Resolved as**: `container.resolve(INVOICE_MODULE)` (string key: `"invoiceModule"`).
- **Consumed by**: `subscribers/order-placed.ts` for invoice record creation.
