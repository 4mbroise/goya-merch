# goya-merch-backend/apps/storefront/src/modules/checkout/components/error-message/

## Responsibility

A minimal conditional error display component. Renders a styled error message in red only when a truthy error string is provided; otherwise returns `null`.

## Design

Null-rendering guard component. Stateless, no internal logic. Accepts an optional `data-testid` for test targeting. Single responsibility — purely presentational.

## Flow

Props in: `error` (string | null | undefined), optional `data-testid`. If `error` is falsy, renders nothing. If truthy, renders a `<div>` with `text-rose-500` styling and the error text inside a `<span>`.

## Integration

Imported and reused across `Addresses`, `Shipping`, `Payment`, `PaymentButton`, and `DiscountCode` for inline validation feedback. Also used in the cart/delivery flow outside checkout.
