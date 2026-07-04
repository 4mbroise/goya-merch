# goya-merch-backend/apps/storefront/src/modules/common/components/interactive-link/

## Responsibility

A styled link with an animated arrow-up-right icon, used for navigational CTAs throughout the storefront.

## Design

Composes `LocalizedClientLink` (for country-code-prefixed navigation) with `ArrowUpRightMini` from `@medusajs/icons`. The arrow icon rotates 45 degrees on hover via Tailwind `group-hover:rotate-45`. Link color uses the `--fg-interactive` CSS variable.

## Props

```ts
{
  href: string
  children?: React.ReactNode
  onClick?: () => void
}
```

## Integration

Used for "View all", "See details", and similar navigation CTAs across product listing pages.
