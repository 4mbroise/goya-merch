# goya-merch-backend/apps/storefront/src/modules/common/

## Responsibility

Provides the shared presentational primitives and SVG icon set consumed by all feature modules in the storefront. This is the lowest-level module — every other module depends on it. It owns no business logic, only reusable UI atoms and iconography.

## Design

Divided into two subdirectories: `components/` (compositional UI primitives built on Tailwind CSS and `@medusajs/ui`/`@headlessui/react`) and `icons/` (inline SVG icon components conforming to the `IconProps` type from `types/icon.ts`). Components are strictly presentational — props are values and callbacks, never Medusa client instances. Icons accept `size`, `color`, and spread remaining SVG attributes.

## Flow

Data flows in via props only. No internal state is held beyond transient UI state (e.g., loading spinners, password visibility toggles). No module-level side effects or data fetching. Components re-export `clsx` as `clx` for className merging and rely on the design token classes (`ui-fg-*`, `ui-bg-*`, `txt-*`) defined in the Tailwind config.

## Integration

- **Cart totals** module consumes `cart-totals`, `line-item-price`, `line-item-unit-price`, `line-item-options`.
- **Checkout** module consumes `input`, `checkbox`, `radio`, `native-select`, `delete-button`, `modal`.
- **Product** module consumes `filter-radio-group`, `interactive-link`, `localized-client-link`.
- **Account** module consumes `input`, `delete-button`, `modal`, `localized-client-link`.
- **Navigation** (layout, header, footer) consumes `localized-client-link`, `interactive-link`.
- Icons are imported ad-hoc across all modules for decorative/action elements.
- `ui/` (Text, Heading, Button, Label, Badge, Table, RadioGroup, Checkbox) is re-used by the component primitives above and directly by feature modules.
