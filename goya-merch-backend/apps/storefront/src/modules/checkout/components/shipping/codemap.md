# goya-merch-backend/apps/storefront/src/modules/checkout/components/shipping/

## Responsibility

Second step in the checkout flow. Presents shipping and pickup method options, calculates dynamic prices for calculated-rate options, and persists the selected method to the cart.

## Design

Step container with URL-driven open/closed state (`?step=delivery`). Separates available shipping methods into two arrays — `_shippingMethods` (non-pickup) and `_pickupMethods` (pickup) — by inspecting the nested `service_zone.fulfillment_set.type`. Uses a two-tier radio group layout: one for pickup vs. ship toggle, and one for the actual method list. Calculated-price shipping options are fetched asynchronously via `calculatePriceForShippingOption` on mount and stored in a `calculatedPricesMap`. Handles loading states per-option and disables options that failed to calculate.

## Flow

Props in: `cart` (StoreCart), `availableShippingMethods` (StoreCartShippingOption[] | null).
- On mount: loads calculated prices for all `price_type === "calculated"` options via `Promise.allSettled`.
- `handleSetShippingMethod(id, variant)`: calls `setShippingMethod({ cartId, shippingMethodId: id })` from `@lib/data/cart`. Optimistically sets local `shippingMethodId`, rolling back on error.
- Pickup options show store address via `formatAddress`.
- Flat-rate options display price directly; calculated options show price from `calculatedPricesMap` or a `Loader` while fetching.
- `handleSubmit` navigates to `?step=payment`.
- Collapsed view shows the selected method name and cost.

## Integration

Data actions: `setShippingMethod` from `@lib/data/cart`, `calculatePriceForShippingOption` from `@lib/data/fulfillment`. Formatting: `convertToLocale` from `@lib/util/money`. Composes `ErrorMessage`. Consumed by `CheckoutForm` template.
