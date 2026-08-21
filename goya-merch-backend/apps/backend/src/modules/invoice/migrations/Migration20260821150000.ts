import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260821150000 extends Migration {

  override async up(): Promise<void> {
    // Change total_ttc from integer to numeric(19,4) to support fractional
    // order totals (e.g., €0.50 from promotional credits) without precision loss.
    // Previously, inserting a decimal total like 0.5 would fail with:
    // "invalid input syntax for type integer: 0.5"
    this.addSql(`alter table if exists "invoice" alter column "total_ttc" type numeric(19,4) using total_ttc::numeric(19,4);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "invoice" alter column "total_ttc" type integer using total_ttc::integer;`);
  }

}
