# goya-merch-backend/apps/storefront/src/modules/account/components/account-nav/

## Responsibility
Responsive navigation sidebar for the account area. Provides links to Overview, Profile, Addresses, Orders, and a Logout button. Adapts layout between mobile (accordion-style with back link) and desktop (vertical link list with active state).

## Design
Client component (`"use client"`). Uses `usePathname()` and `useParams()` to derive the current route and set active link styling. Contains an inner `AccountNavLink` helper that renders a `LocalizedClientLink` with active highlighting via route matching.

## Flow
**Props in**: `customer` (`HttpTypes.StoreCustomer | null`).

**Renders two layouts via responsive breakpoints**:
- **Mobile** (`small:hidden`): If on the main `/account` page, shows greeting + full nav list with icons; otherwise shows a back-to-Account link.
- **Desktop** (`hidden small:block`): Static sidebar with heading and styled link list.

**Logout**: Calls `signout(countryCode)` from `@lib/data/customer` on button click.

## Integration
- Used by: `AccountLayout` template (`../templates/account-layout.tsx`).
- Calls: `signout` from `@lib/data/customer`.
- Dependencies: `@medusajs/icons` (ArrowRightOnRectangle), custom icons (ChevronDown, MapPin, Package, User), `LocalizedClientLink`.
