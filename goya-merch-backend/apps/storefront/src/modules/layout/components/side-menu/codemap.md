# goya-merch-backend/apps/storefront/src/modules/layout/components/side-menu/

## Responsibility

Client-side full-height overlay navigation panel triggered by the "Menu" button in the sticky header. Displays primary navigation links (Home, Store, Account, Cart), along with language and country selectors with hover-to-open dropdowns, and a copyright notice.

## Design

- **Headless UI Popover**: Uses `Popover` with render-prop pattern to access `open`/`close` state. The panel appears as a backdrop-blur overlay covering roughly one-third of the viewport width.
- **Backdrop**: When open, a fixed full-screen `<div>` with `onClick={close}` sits below the panel, allowing click-outside-to-close.
- **Toggle state management**: Two independent `useToggleState` instances control the `LanguageSelect` and `CountrySelect` dropdowns. Each parent `<div>` has `onMouseEnter`/`onMouseLeave` handlers wired to open/close the respective toggle.
- **Navigation links**: Defined in a static `SideMenuItems` object mapping labels to localized paths. Each link calls `close()` on click to dismiss the menu.
- **Arrow indicator**: An `ArrowRightMini` icon rotates `-90deg` when its corresponding selector is open, providing a visual affordance.
- **Client boundary**: Declares `"use client"`; receives `regions`, `locales`, and `currentLocale` as server-fetched props from `Nav`.

## Flow

```
SideMenu({ regions, locales, currentLocale })
  ↓ two useToggleState() for country / language
  ↓
  render:
    Popover.Button → "Menu" (hover-accessible)
    (if open) fixed backdrop div → onClick={close}
    PopoverPanel (Transition: fade + backdrop-blur):
      XMark close button
      nav ul:
        "Home" → /, "Store" → /store, "Account" → /account, "Cart" → /cart
      language row (hover opens LanguageSelect):
        LanguageSelect({ toggleState: languageToggleState, locales, currentLocale })
        ArrowRightMini (rotated when open)
      country row (hover opens CountrySelect):
        CountrySelect({ toggleState: countryToggleState, regions })
        ArrowRightMini (rotated when open)
      copyright: "© {year} GOYA. All rights reserved."
```

## Integration

- Props: `regions: StoreRegion[] | null`, `locales: Locale[] | null`, `currentLocale: string | null`
- Uses `useToggleState` from `@lib/hooks/use-toggle-state`
- Imports and composes `CountrySelect` from `../country-select` and `LanguageSelect` from `../language-select`
- Uses `XMark` and `ArrowRightMini` icons from `@medusajs/icons`
- Navigates via `LocalizedClientLink` from `@modules/common/components/localized-client-link`
- Consumed by `Nav` template

