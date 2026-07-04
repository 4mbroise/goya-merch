# goya-merch-backend/apps/storefront/src/modules/common/components/ui/

## Responsibility

A single-file design-system primitive module. Provides the lowest-level HTML wrapper components and utilities that every other component in the storefront builds upon. This is the closest the app has to a formal UI kit.

## Design

All exports are standalone `forwardRef` components or plain functions. Uses `clsx` (re-exported as `clx`) for className merging. Styling is entirely Tailwind utility classes with no CSS modules. Components expose standard HTML attributes via intersection types.

## Flow

Props-in → styled-JSX-out. No state. No side effects. Every component forwards its ref.

**Named exports:**

| Export | Type | Description |
|---|---|---|
| `clx` | function | Re-export of `clsx` for className merging |
| `Text` | component | `<p>`/`<span>`/`<div>` via `as` prop |
| `Heading` | component | `<h1>`/`<h2>`/`<h3>` via `level` prop |
| `Button` | component | `primary`/`secondary`/`transparent` variants, `small`/`medium`/`large` sizes, `isLoading` state |
| `Container` | component | Wrapper `<div>` with rounded corners and padding |
| `Badge` | component | Inline pill with `green`/`red`/`blue`/`orange`/`grey`/`purple` color |
| `IconBadge` | component | Circular container for icon placement |
| `IconButton` | component | Square icon-only `<button>` with hover state |
| `Label` | component | `<label>` element with font-medium |
| `Input` | component | `<input>` with optional label |
| `Table` | namespace | `Table.Root`, `.Header`, `.Body`, `.Row`, `.Head`, `.HeaderCell`, `.Cell` |
| `RadioGroup` | namespace | `RadioGroup.Root` (wrapper), `.Item` (radio input + optional label) |
| `Checkbox` | component | `<input type="checkbox">` with optional label |

## Integration

Consumed by every component in `common/components/` and by all feature modules (cart, checkout, account, product, order, etc.). The most broadly imported module in the storefront.
