# goya-merch-backend/apps/backend/src/modules/invoice/models/

## Responsibility
MikroORM entity definition for the invoice module. Defines the `invoice` database table schema using Medusa's `model.define()` DSL.

## Design
- **Medusa Model DSL Pattern**: Uses `model.define()` from `@medusajs/framework/utils` which wraps MikroORM decorators in a declarative API. The resulting entity class is passed to `MedusaService` for auto-generated CRUD operations.
- **Schema**:
  - `id` — Primary key text field.
  - `invoice_number` — Unique sequential invoice identifier (text, unique constraint).
  - `order_id` — Foreign reference to the Medusa order.
  - `customer_email`, `customer_name` — Customer identification.
  - `total_ttc` — Order total (integer, in cents/minor unit).
  - `currency_code` — ISO 4217 currency code (e.g., `eur`).
  - `file_key` — GitHub storage path (`invoices/YYYY/MM/INVOICE_NUMBER.pdf`).
  - `file_url` — GitHub raw URL (nullable, set after successful upload).
  - `issued_at` — Timestamp of invoice generation.
  - Auto-managed: `created_at`, `updated_at`, `deleted_at` (soft delete).

## Flow
1. Model is imported by `modules/invoice/index.ts` and passed to `MedusaService({ Invoice })`.
2. MikroORM uses this definition to generate the database schema during migration.
3. Service methods like `createInvoices()` and `listInvoices()` operate on this entity.

## Integration
- **Parent**: `modules/invoice/` — Invoice module.
- **Consumed by**: `modules/invoice/index.ts` (service definition), `modules/invoice/migrations/` (schema migration).
- **Dependencies**: `@medusajs/framework/utils` for `model` DSL.
