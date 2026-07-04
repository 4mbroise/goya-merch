# goya-merch-backend/apps/storefront/src/modules/account/templates/

## Responsibility
Page-level compositions that wire account components together into full-page layouts. Includes the authenticated account layout and the login/register auth flow.

## Design
- **AccountLayout**: Server-compatible layout component providing the shared account page structure — nav sidebar via `AccountNav`, main content slot via `children`, and a "Got questions?" footer with a Customer Service link.
- **LoginTemplate**: Client component (`"use client"`) that manages a `LOGIN_VIEW` state enum to toggle between `<Login>` and `<Register>` components.

## Flow

### AccountLayout
**Props**: `customer: HttpTypes.StoreCustomer | null`, `children: React.ReactNode`.

```
[Grid: 240px sidebar | 1fr content]
  Sidebar: AccountNav (if customer exists)
  Content: {children}
[Footer: "Got questions?" + Customer Service link]
```

### LoginTemplate
**State**: `currentView` — `"sign-in"` (default) or `"register"`.

**Renders**:
- `currentView === "sign-in"` → `<Login setCurrentView={setCurrentView} />`
- `currentView === "register"` → `<Register setCurrentView={setCurrentView} />`

## Integration
- **AccountLayout**: Used as the layout wrapper for all `/account/*` routes. Depends on `AccountNav` from `../components/account-nav` and `UnderlineLink` from `@modules/common/components/interactive-link`.
- **LoginTemplate**: Used by the login page route. Depends on `Login` and `Register` from `../components/`.
- The `LOGIN_VIEW` enum is exported from here and consumed by both `Login` and `Register` components for type-safe view switching.
