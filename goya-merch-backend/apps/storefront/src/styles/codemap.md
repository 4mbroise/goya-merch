# goya-merch-backend/apps/storefront/src/styles/

## Responsibility

Central stylesheet entry point for the storefront. Imports Tailwind CSS layers (base, components, utilities), defines custom utility classes (scrollbar hiding, floating-label form inputs, autofill overrides, search input reset), and provides a consistent typography scale with accompanying component-class shortcuts.

## Design

- **Tailwind layer pattern**: Uses `@import "tailwindcss/base"`, `components`, and `utilities` as the foundation, with custom additions scoped to `@layer utilities` and `@layer components`.
- **Utility-first typography scale**: Defines nine text-size pairs (xsmall through 3xl, each with `-regular` and `-semi` weight variants) as reusable component classes (e.g., `.text-small-regular` maps to `text-xs leading-5 font-normal`). This bridges the Medusa UI preset's design tokens to template-friendly class names.
- **Browser-specific overrides**: Normalizes autofill styling across WebKit browsers (sass/Chrome/Safari) and hides scrollbar chrome while preserving scroll functionality via the `.no-scrollbar` utility.
- **Container constraint**: `.content-container` caps layout width at 1440px with horizontal padding, used by page-level wrappers throughout the app.

## Flow

1. `globals.css` is imported once by the root layout (`app/layout.tsx`) and compiled by PostCSS with `tailwindcss` + `autoprefixer` plugins.
2. Tailwind scans source files specified in `tailwind.config.js` (`app/`, `components/`, `modules/`) and generates utility classes on demand.
3. Custom component classes (`.text-*-regular`, `.text-*-semi`, `.content-container`, `.contrast-btn`) are used in JSX via string literals or the `clsx` utility.

## Integration

- **Consumer**: `app/layout.tsx` imports `styles/globals.css` directly.
- **PostCSS pipeline**: `postcss.config.js` runs `tailwindcss` then `autoprefixer`; the `tailwindcss-radix` plugin provides Radix UI-compatible state variants.
- **Tailwind preset**: `@medusajs/ui-preset` provides the foundational design token set; this file adds the GOYA-specific colour palette (goya-ink, goya-bg, goya-border, goya-fg), custom breakpoints, keyframes, and extended `transitionProperty` and `borderRadius` sets.
