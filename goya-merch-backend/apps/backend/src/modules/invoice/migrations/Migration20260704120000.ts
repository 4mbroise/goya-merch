import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260704120000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE SEQUENCE IF NOT EXISTS invoice_number_seq START 1;`);
  }

  override async down(): Promise<void> {
    this.addSql(`DROP SEQUENCE IF EXISTS invoice_number_seq;`);
  }

}
