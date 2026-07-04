# goya-merch-backend/apps/backend/src/subscribers/

## Responsibility
Event subscribers that react to Medusa lifecycle events and trigger side-effects. Three subscribers handle order placement (invoice creation + confirmation email), order shipment (tracking notification email), and product changes (storefront cache revalidation).

## Design
- **Medusa Event Subscriber Pattern**: Each file exports a default async handler function and a `config` object with the event name(s) to subscribe to. Medusa's event bus discovers and registers these automatically at startup.
- **Dependency Injection**: Handlers receive a `SubscriberArgs` object with `event.data` (payload) and `container` (MedusaContainer) for resolving services and modules.
- **Three Subscribers**:
  1. `order-placed.ts` — Listens to `"order.placed"`. Resolves `Modules.NOTIFICATION`, `Modules.ORDER`, and `INVOICE_MODULE`. Retrieves the full order, generates a sequential invoice number (`GOYA-MERCH-NNNN`), pre-creates an invoice record in the database, then triggers a notification with template `"order.confirmation"` passing order data plus the invoice number.
  2. `order-shipment-created.ts` — Listens to `"order.shipment_created"`. Respects the `no_notification` flag to suppress emails. Resolves notification and order services, retrieves the order with fulfillment data, and triggers a notification with template `"order.shipment_created"`.
  3. `product-updated.ts` — Listens to `"product.created"`, `"product.updated"`, `"product.deleted"`, `"product-variant.created"`, `"product-variant.updated"`, `"product-variant.deleted"`. Calls a storefront revalidation endpoint (`POST /api/revalidate`) to purge cached pages when catalog data changes. Skips if `REVALIDATE_SECRET` is not configured.

## Flow
1. Medusa's internal event bus emits events from workflows (e.g., `OrderService.create()` triggers `order.placed`).
2. Each subscriber's handler is invoked with the event payload and DI container.
3. Handlers resolve required services and modules, perform business logic (invoice creation, revalidation HTTP call), and trigger downstream notifications.
4. Notification modules process the `createNotifications` call, routing to the configured `resend` provider.

## Integration
- **Parent**: `src/` — Main source tree.
- **Files**:
  - `order-placed.ts` — Invoice + confirmation email flow.
  - `order-shipment-created.ts` — Shipping notification email flow.
  - `product-updated.ts` — Storefront cache revalidation.
- **Consumed by**: Medusa event bus (auto-discovered and registered).
- **Dependencies**: `@medusajs/framework` (types), `@medusajs/framework/utils` (`Modules`), `modules/invoice` (`INVOICE_MODULE`).
- **External calls**: HTTP POST to storefront revalidation endpoint (product-updated subscriber).
