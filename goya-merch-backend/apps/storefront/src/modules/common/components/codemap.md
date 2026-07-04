# goya-merch-backend/apps/storefront/src/modules/common/components/

## Responsibility

Houses all shared presentational UI primitives used across the storefront. These are the building blocks from which feature-specific UIs are composed. Each component lives in its own folder with a single `index.tsx` default export.

## Design

Every component is a React function component (or `forwardRef` wrapper) that accepts typed props and renders JSX via Tailwind CSS. Components never import from feature modules. They depend on `@modules/common/components/ui` (Text, Heading, Button, Label, Badge, clx, Table, RadioGroup, Checkbox), `@medusajs/icons`, `@headlessui/react`, and local `@modules/common/icons/*`.

## Flow

Props-in → JSX-out. No data fetching or side effects. Several components carry transient local state: `delete-button` (isDeleting), `input` (showPassword), `native-select` (isPlaceholder). The `modal` component uses `@headlessui/react` Transition + Dialog and a `ModalContext` for title/description/body/footer slots.

## Integration

Referenced from every feature module in the storefront. The `ui/` sub-module (Text, Heading, Button, Label, Badge, Table, RadioGroup, Checkbox, Container, IconBadge, IconButton, clx) is the most broadly consumed — it is re-exported by the component primitives and imported directly by page-level modules.

### Children

| Folder | Default Export | Role |
|---|---|---|
| `cart-totals/` | `CartTotals` | Displays cart subtotal, shipping, discount, taxes, total |
| `checkbox/` | `CheckboxWithLabel` | Checkbox with associated label |
| `delete-button/` | `DeleteButton` | Calls `deleteLineItem` with loading spinner feedback |
| `divider/` | `Divider` | Thin horizontal rule |
| `filter-radio-group/` | `FilterRadioGroup` | Radio-group filter panel with active indicator |
| `input/` | `Input` | Floating-label text/password input with password toggle |
| `interactive-link/` | `InteractiveLink` | Styled link with arrow-up-right icon |
| `line-item-options/` | `LineItemOptions` | Displays variant title for a line item |
| `line-item-price/` | `LineItemPrice` | Formatted line-item price with discount strikethrough |
| `line-item-unit-price/` | `LineItemUnitPrice` | Per-unit price with discount percentage |
| `localized-client-link/` | `LocalizedClientLink` | Next.js Link with country-code prefix |
| `modal/` | `Modal` | Headless UI dialog with Title/Description/Body/Footer sub-components |
| `native-select/` | `NativeSelect` | Styled `<select>` with placeholder and chevron |
| `radio/` | `Radio` | Styled radio button with checked state |
| `ui/` | (multiple named exports) | Design-system primitives (Text, Heading, Button, Label, Badge, Table, RadioGroup, Checkbox, etc.) |
