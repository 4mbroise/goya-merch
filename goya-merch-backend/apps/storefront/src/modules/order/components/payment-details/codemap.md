# goya-merch-backend/apps/storefront/src/modules/order/components/payment-details/

## Responsibility

Displays the payment method used for the order and masked payment details (last 4 card digits for Stripe-like providers, or the full paid amount with timestamp for other providers).

## Design

Presentational component accepting `HttpTypes.StoreOrder`. Navigates into `order.payment_collections[0].payments[0]` to access the payment record. Uses `paymentInfoMap` to look up the provider title and icon (CreditCard, Ideal, Bancontact, PayPal, etc.) from `@lib/constants`. Uses `isStripeLike` to conditionally mask card numbers or show the full amount. Wraps output in a two-column flex layout with a `Divider` separator at the bottom.

## Flow

**Props in**: `order` (HttpTypes.StoreOrder).  
**Events out**: None.  
**Data calls**: None. Static lookup from `@lib/constants`.

## Integration

- Consumed by: `OrderCompletedTemplate`
- Dependencies: `@modules/common/components/ui` (Container, Heading, Text), `@modules/common/components/divider`, `@lib/util/money`, `@lib/constants`
- Test hooks: `data-testid="payment-method"`, `data-testid="payment-amount"`
