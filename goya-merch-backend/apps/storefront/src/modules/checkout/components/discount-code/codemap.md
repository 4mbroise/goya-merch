# goya-merch-backend/apps/storefront/src/modules/checkout/components/discount-code/

## Responsibility

Manages promotion/discount code entry, application, and removal within the checkout summary. Displays applied promotions with their value amounts and supports adding multiple codes.

## Design

Client component with local isOpen/error toggle. Form submission uses a nested `form action` callback (`addPromotionCode`) that collects codes from the cart's existing promotions, appends the new code, and calls `applyPromotions` from `@lib/data/cart`. Removal triggers `removePromotionCode` which filters out the given code and reapplies the remaining list. Applied promotions are rendered as rows with a `Badge` showing the code and formatted value (percentage or locale currency). Automatic promotions are rendered without a remove button.

## Flow

Props in: `cart` (StoreCart). Reads `cart.promotions` for existing codes.
- Toggle `isOpen` to show/hide the code input and Apply button.
- `addPromotionCode`: reads the input field via `FormData.get("code")`, appends to existing codes, calls `applyPromotions`. On error, sets local `errorMessage`.
- `removePromotionCode`: filters out the code from `promotions`, calls `applyPromotions` with the remaining codes.
- Rendered promotions show code, value (percentage or currency), and trash button (unless `is_automatic`).

## Integration

Server action: `applyPromotions` from `@lib/data/cart`. Formatting: `convertToLocale` from `@lib/util/money`. Uses `SubmitButton` (named export) for the Apply button and `ErrorMessage` for validation feedback. Consumed by `CheckoutSummary` template.
