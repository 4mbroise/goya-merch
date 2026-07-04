# goya-merch-backend/apps/backend/src/modules/invoice/migrations/

## Responsibility
MikroORM database migrations for the invoice module. Handles schema creation and modification of the `invoice` table in PostgreSQL.

## Design
- **MikroORM Migration Pattern**: Migrations extend `Migration` from `@medusajs/framework/mikro-orm/migrations`, which provides `this.addSql()` for raw SQL execution and `up()`/`down()` lifecycle methods.
- **Single Migration**: `Migration20260620133630` creates the `invoice` table with columns: `id` (PK text), `invoice_number`, `order_id`, `customer_email`, `customer_name`, `total_ttc` (integer), `currency_code`, `file_key`, `file_url` (nullable), `issued_at`, plus standard Medusa soft-delete timestamps.
- **Indexing Strategy**: A unique partial index `IDX_invoice_invoice_number_unique` on `invoice_number WHERE deleted_at IS NULL` ensures sequential invoice number uniqueness without conflicting with soft-deleted records. A filtered index on `deleted_at` optimizes soft-delete queries.

## Flow
1. On `medusa develop` or `medusa db:migrate`, MikroORM discovers migrations in this directory.
2. `up()` is executed, creating the `invoice` table and indexes.
3. A snapshot file (`.snapshot-invoice-module.json`) tracks the schema for diff-based migration generation.

## Integration
- **Parent**: `modules/invoice/` — Invoice module.
- **Snapshot**: `.snapshot-invoice-module.json` — MikroORM snapshot for schema diffing.
- **Dependencies**: `@medusajs/framework/mikro-orm/migrations` for the base `Migration` class.
