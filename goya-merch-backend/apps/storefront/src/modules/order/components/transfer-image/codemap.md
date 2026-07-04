# goya-merch-backend/apps/storefront/src/modules/order/components/transfer-image/

## Responsibility

Renders a decorative SVG illustration for the order transfer flow. Provides visual context on transfer request, acceptance, and decline pages.

## Design

Pure SVG component typed as `React.FC<SVGProps<SVGSVGElement>>`, accepting standard SVG props for width, height, and styling. The illustration depicts a visual metaphor of order transfer using layered card-like rectangles with arrow animations. All colors use Tailwind-compatible zinc/gray palette values (`#D4D4D8`, `#52525B`, `#A1A1AA`, white). Accepts an underscore-prefixed `_props` parameter (unused internally but available for external styling overrides).

## Flow

**Props in**: Standard `SVGProps<SVGSVGElement>` (typically none passed in practice — the underscore prefix signals intentional non-usage).  
**Events out**: None.  
**Data calls**: None.

## Integration

- Consumed directly by route pages:
  - `order/[id]/transfer/[token]/page.tsx` — main transfer request page
  - `order/[id]/transfer/[token]/accept/page.tsx` — acceptance confirmation
  - `order/[id]/transfer/[token]/decline/page.tsx` — decline confirmation
- Dependencies: `react` (SVGProps type only)
