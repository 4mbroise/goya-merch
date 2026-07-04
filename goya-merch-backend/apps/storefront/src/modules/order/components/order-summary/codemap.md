# goya-merch-backend/apps/storefront/src/modules/order/components/order-summary/

## Responsibility

Renders a financial summary of the order, displaying subtotal, discounts (order-level and gift card), shipping cost, taxes, and the grand total. Uses `convertToLocale` for EUR locale-aware currency formatting.

## Design

Presentational component accepting `HttpTypes.StoreOrder`. Conditionally renders discount and gift card lines only when their totals are greater than zero. Uses a local `getAmount` helper that wraps `convertToLocale` with a null guard. The visual layout is a vertical stack of label-value pairs with a dashed separator above the total.

## Flow

**Props in**: `order` (HttpTypes.StoreOrder).  
**Events out**: None.  
**Data calls**: None. Formatting via `@lib/util/money`.

## Integration

- Consumed by: `OrderDetailsTemplate` (not used in `OrderCompletedTemplate`, which uses `CartTotals` instead)
- Dependencies: `@lib/util/money`, `@medusajs/types`
- Order fields consumed: `subtotal`, `discount_total`, `gift_card_total`, `shipping_total`, `tax_total`, `total`, `currency_code`
