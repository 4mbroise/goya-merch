# goya-merch-backend/apps/storefront/src/modules/products/components/product-actions/

## Responsibility

The primary interactive component for product variant selection and add-to-cart on the product detail page. Manages option state (size/color), validates variant availability (inventory, backorder), and triggers cart addition. Includes a mobile-optimized sticky bottom bar with a modal option picker.

## Design

- **Client component** (`"use client"`) -- manages option selection state via `useState<Record<string, string | undefined>>`.
- **Option-key mapping** -- `optionsAsKeymap` converts variant option arrays `[{ option_id, value }]` into a flat `Record<option_id, value>` for direct comparison via `lodash/isEqual`.
- **Single-variant auto-select** -- if `product.variants.length === 1`, options are pre-selected on mount via `useEffect`.
- **Variant validity** -- `isValidVariant` memo checks whether the current option combination exists as a variant; `inStock` memo checks `manage_inventory`, `allow_backorder`, and `inventory_quantity`.
- **URL sync** -- selected variant ID is pushed to the URL search param `v_id` via `router.replace`.
- **Desktop/Mobile split** -- main desktop UI renders `OptionSelect` per option, `ProductPrice`, and an "Add to cart" `<Button>`. `MobileActions` appears when the main actions container scrolls out of view (`useIntersection`).
- **Sub-components**:
  - `OptionSelect` -- renders a row of toggle buttons for a single product option (e.g., Size, Color), highlighting the selected value with `border-ui-border-interactive`.
  - `MobileActions` -- a fixed bottom bar that shows product title, price, an option selector button opening a `@headlessui/react` `Dialog` modal, and an add-to-cart button. Uses `useToggleState` for modal open/close and `isSimpleProduct` to conditionally hide the option selector for single-variant products.

## Flow

1. Props in: `product`, `region`, `disabled?`
2. On mount, if only one variant exists, auto-selects its options.
3. User clicks an `OptionSelect` button -> `setOptionValue(optionId, value)` updates local options state.
4. `selectedVariant` and `isValidVariant` recalculate via `useMemo`.
5. URL param `v_id` syncs with selected variant ID.
6. `handleAddToCart` calls `addToCart({ variantId, quantity: 1, countryCode })` from `@lib/data/cart`.
7. `MobileActions` appears via `useIntersection` when the main actions div scrolls above viewport; its modal provides the same `OptionSelect` UI.
8. Add-to-cart button is disabled when `!inStock || !selectedVariant || isAdding || !isValidVariant`.

## Integration

- **Data**: `@lib/data/cart` (`addToCart`), `@lib/data/products` (via parent wrapper)
- **Hooks**: `@lib/hooks/use-in-view` (`useIntersection`), `@lib/hooks/use-toggle-state`
- **Utilities**: `@lib/util/get-product-price` (in MobileActions), `@lib/util/product` (`isSimpleProduct`)
- **Common components**: `Button`, `clx` from `@modules/common/components/ui`, `Divider`, `ProductPrice`
- **UI library**: `@headlessui/react` (`Dialog`, `Transition`)
- **Consumed by**: `templates/product-actions-wrapper/index.tsx` which provides the priced product data, and rendered inside `templates/index.tsx` (ProductTemplate) within a Suspense boundary.
