import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260620133630 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "invoice" drop constraint if exists "invoice_invoice_number_unique";`);
    this.addSql(`create table if not exists "invoice" ("id" text not null, "invoice_number" text not null, "order_id" text not null, "customer_email" text not null, "customer_name" text not null, "total_ttc" integer not null, "currency_code" text not null, "file_key" text not null, "file_url" text null, "issued_at" timestamptz not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "invoice_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_invoice_invoice_number_unique" ON "invoice" ("invoice_number") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_invoice_deleted_at" ON "invoice" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "invoice" cascade;`);
  }

}
