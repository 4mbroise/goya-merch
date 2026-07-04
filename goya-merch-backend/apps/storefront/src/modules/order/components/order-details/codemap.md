# goya-merch-backend/apps/storefront/src/modules/order/components/order-details/

## Responsibility

Displays key order metadata: email confirmation recipient, creation date, display ID (order number), and optionally the fulfillment and payment statuses.

## Design

Presentational component that accepts either a full `HttpTypes.StoreOrder`. The `showStatus` boolean prop controls whether fulfillment and payment status labels render. The `formatStatus` helper converts snake_case status strings to Title Case for display. Renders read-only `Text` elements with `data-testid` attributes for test targeting.

## Flow

**Props in**: `order` (HttpTypes.StoreOrder), `showStatus` (optional boolean).  
**Events out**: None.  
**Data calls**: None.

## Integration

- Consumed by: `OrderCompletedTemplate` (without status), `OrderDetailsTemplate` (with status)
- Dependencies: `@modules/common/components/ui` (Text)
- Test hooks: `data-testid="order-email"`, `data-testid="order-date"`, `data-testid="order-id"`, `data-testid="order-status"`, `sata-testid="order-payment-status"`
