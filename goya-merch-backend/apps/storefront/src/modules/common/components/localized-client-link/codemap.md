# goya-merch-backend/apps/storefront/src/modules/common/components/localized-client-link/

## Responsibility

A Next.js `<Link>` wrapper that automatically prepends the current country code from the URL params to the `href`. This is the primary navigation component for all client-side transitions in the storefront.

## Design

Marked `"use client"`. Reads `countryCode` from `useParams()` (Next.js App Router). Prepends `/${countryCode}` to the provided `href` before passing it to Next.js `<Link>`. All other props are spread onto `<Link>`. This avoids needing to pass `countryCode` explicitly at every call site.

## Props

```ts
{
  children?: React.ReactNode
  href: string                  // relative path without country prefix
  className?: string
  onClick?: () => void
  passHref?: true
  [x: string]: unknown          // any additional Link/Anchor props
}
```

## Integration

Used in virtually every navigation element: header, footer, product links, CTAs, breadcrumbs, account navigation. Also wrapped by `InteractiveLink`.
