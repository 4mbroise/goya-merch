# goya-merch-backend/apps/storefront/src/modules/layout/components/language-select/

## Responsibility

Client-side locale/language selector rendered as a Headless UI `Listbox`. Allows the user to switch the storefront locale, triggering `updateLocale()` and a full page refresh via `router.refresh()`.

## Design

- **Headless UI Listbox**: Same pattern as `CountrySelect` — `Listbox`, `ListboxButton`, `ListboxOption`, `ListboxOptions`, `Transition`.
- **Intl API for display names**: Uses `Intl.DisplayNames` to generate localized language labels in the user's current locale. Falls back to the raw locale name if `Intl` is unavailable.
- **Locale-to-flag mapping**: Derives a country code from each locale string using `Intl.Locale` (with `.maximize()` fallback) for flag rendering via `ReactCountryFlag`.
- **Default option**: Always prepends a `DEFAULT_OPTION` (`{ code: "", name: "Default", ... }`) that deselects any specific locale.
- **Pending state**: Uses `useTransition` (`isPending`) to disable the Listbox during the async `updateLocale` call and show "..." as the current name while the transition runs.
- **Controlled toggle**: Same `toggleState` pattern as `CountrySelect` — parent (`SideMenu`) drives open/close via hover.

## Flow

```
LanguageSelect({ toggleState, locales, currentLocale })
  ↓ useMemo: map locales → LanguageOption[] (with localizedName + countryCode)
  ↓ useEffect [currentLocale]: set current matching option or DEFAULT_OPTION
  ↓
  render:
    ListboxButton: "Language:" + flag + (isPending ? "..." : localizedName)
    ListboxOptions (conditional Transition):
      options[] → each: flag + localizedName
    onChange(option) →
      startTransition(async () => {
        await updateLocale(option.code)
        close()
        router.refresh()
      })
```

## Integration

- Props: `toggleState: StateType`, `locales: Locale[]`, `currentLocale: string | null`
- Calls `updateLocale(localeCode)` from `@lib/data/locale-actions`
- Uses `useRouter` from `next/navigation` to call `router.refresh()` after locale change
- Uses `Intl.Locale` and `Intl.DisplayNames` (Web API, no external dependency for names)
- Uses `ReactCountryFlag` for SVG flag rendering
- Consumed by `SideMenu` component

