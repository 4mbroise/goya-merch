# goya-merch-backend/apps/storefront/src/modules/products/components/product-tabs/

## Responsibility

Renders expandable accordion sections on the product detail page containing "Product Information" (material, country of origin, type, weight, dimensions) and "Shipping & Returns" (delivery policy, exchanges, returns) details.

## Design

- **Client component** (`"use client"`) -- uses `@radix-ui/react-accordion` primitives for accessible, animated accordion behavior with `type="multiple"` to allow simultaneous open sections.
- **Composition** -- `ProductTabs` defines two tab objects as `{ label, component }` pairs and renders them inside a generic `Accordion` wrapper.
- **Sub-component -- Accordion**: a thin re-export wrapper around `AccordionPrimitive.Root` with a co-located `Item` sub-component. `Item` composes `AccordionPrimitive.Item`, `Header`, `Trigger`, and `Content` with custom styling:
  - Borders between items (`border-t`, last item gets `border-b`).
  - Custom `MorphingTrigger` animated chevron (two rotating spans forming a plus-to-minus morph).
  - Radix state-driven open/close animations via `animate-accordion-open` / `animate-accordion-close` CSS classes.
  - `forceMount` support for content that must remain in DOM.
- **Product Info tab** -- reads product fields (`material`, `origin_country`, `type.value`, `weight`, `length`, `width`, `height`) with fallback `"-"` for missing values, laid out in a two-column grid.
- **Shipping & Returns tab** -- static content with `FastDelivery`, `Refresh`, and `Back` icons from the common icon set, each with a heading and descriptive paragraph.

## Flow

1. Props in: `product: HttpTypes.StoreProduct`
2. Defines two tabs in a local array.
3. Renders `<Accordion type="multiple">` containing `<Accordion.Item>` for each tab with `title` and `value` set to the label.
4. Each item renders its associated component when expanded.
5. No external data fetching -- all product data is passed via props; shipping content is static.

## Integration

- **UI library**: `@radix-ui/react-accordion` (AccordionPrimitive.Root, Item, Header, Trigger, Content)
- **Common components**: `Text`, `clx` from `@modules/common/components/ui`
- **Icons**: `Back`, `FastDelivery`, `Refresh` from `@modules/common/icons`
- **Consumed by**: `templates/index.tsx` (ProductTemplate) in the left sticky column of the PDP
