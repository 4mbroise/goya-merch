# goya-merch-backend/apps/storefront/src/modules/layout/templates/nav/

## Responsibility

Async server component that renders the sticky top navigation bar — the primary global header. Composes the side-menu hamburger on the left, the GOYA wordmark in the center, and account/cart controls on the right.

## Design

- **Async server component**: Fetches regions, locales, and currentLocale concurrently via `Promise.all` at request time.
- **Sticky positioning**: Outer `<div>` uses `sticky top-0 inset-x-0 z-50 group` to remain fixed at the top of the viewport across page navigations.
- **Three-column flex layout**: Left `flex-1` holds `SideMenu`; center holds the logo; right `flex-1` holds Account link + `CartButton` — all vertically centered within the `h-16` header.
- **Suspense boundary**: The cart region is wrapped in `<Suspense fallback="Cart (0)">` so the heading and side menu render without waiting for the cart fetch.
- **Responsive**: Account link uses `hidden small:flex` — visible only above the `small` breakpoint.

## Flow

```
async Nav
  ↓ Promise.all([listRegions(), listLocales(), getLocale()])
  ↓
  render:
    div.sticky.top-0.z-50
      header.h-16.border-b
        nav.content-container
          left:  SideMenu({ regions, locales, currentLocale })
          center: LocalizedClientLink("/") → Image(Typo.svg) [GOYA logo, priority]
          right:
            Account → LocalizedClientLink("/account") [hidden small:flex]
            Suspense(fallback="Cart (0)"):
              CartButton()
                → retrieveCart() → CartDropdown({ cart })
```

## Integration

- Calls `listRegions` from `@lib/data/regions`, `listLocales` from `@lib/data/locales`, `getLocale` from `@lib/data/locale-actions`
- Composes `SideMenu` (with all three server-fetched props) and `CartButton`
- Uses `Image` from `next/image` for the GOYA wordmark (`/Typo.svg` with `priority` for LCP)
- Uses `LocalizedClientLink` from `@modules/common/components/localized-client-link` for the logo and account links
- Consumed by the app root layout(s)

