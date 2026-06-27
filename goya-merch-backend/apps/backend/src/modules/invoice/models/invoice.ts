import { model } from "@medusajs/framework/utils"

const Invoice = model.define("invoice", {
  id: model.id().primaryKey(),
  invoice_number: model.text().unique(),
  order_id: model.text(),
  customer_email: model.text(),
  customer_name: model.text(),
  total_ttc: model.number(),
  currency_code: model.text(),
  file_key: model.text(),
  file_url: model.text().nullable(),
  issued_at: model.dateTime(),
})

export default Invoice
