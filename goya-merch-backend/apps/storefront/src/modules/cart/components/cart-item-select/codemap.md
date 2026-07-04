# goya-merch-backend/apps/storefront/src/modules/cart/components/cart-item-select/

## Responsibility
A styled native `<select>` element for choosing cart item quantity. Wraps the select inside an `IconBadge` container with a `ChevronDown` indicator, providing a visually consistent dropdown that matches the dark-theme UI while preserving native accessibility.

## Design
Presentational component using `forwardRef` to expose the underlying `<HTMLSelectElement>` ref. Extends `SelectHTMLAttributes` with optional `placeholder`, `errors`, and `touched` props. Uses `useImperativeHandle` to forward the inner ref to the parent. A `useEffect` detects when the value is empty to toggle a placeholder styling class (`text-ui-fg-subtle`).

## Flow
**Props in:** Standard select attributes (value, onChange, children for `<option>` elements), `placeholder` string (default `"Select..."`), optional `className`.  
**Events out:** Native `onChange` fired on the `<select>`. The parent (`Item` component) handles the event and calls `updateLineItem`.

## Integration
**Imports:** `IconBadge`, `clx` from `@modules/common/components/ui`; `ChevronDown` icon from `@modules/common/icons/chevron-down`.  
**Imported by:** `Item` component (`@modules/cart/components/item`), which renders `<option>` children for quantities 1–10.
