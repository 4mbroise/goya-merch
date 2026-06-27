import { MedusaService, Module } from "@medusajs/framework/utils"
import Invoice from "./models/invoice"

export const INVOICE_MODULE = "invoiceModule"

class InvoiceModuleService extends MedusaService({ Invoice }) {}

export default Module(INVOICE_MODULE, { service: InvoiceModuleService })
