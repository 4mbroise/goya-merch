# goya-merch-backend/apps/storefront/src/modules/layout/components/country-select/

## Responsibility

Client-side country/region selector rendered as a Headless UI `Listbox`. Allows the user to pick a shipping country, which triggers a region update via `updateRegion()` and navigates to the new locale-prefixed URL path.

## Design

- **Headless UI Listbox**: Uses `Listbox`, `ListboxButton`, `ListboxOption`, `ListboxOptions`, and `Transition` for accessible dropdown behavior.
- **Controlled toggle**: Receives a `toggleState` (from `useToggleState`) that drives the `state` (open/closed) and `close` callback. Parent component (`SideMenu`) controls open/close via hover events.
- **Flat option list**: Flattens the nested `regions[].countries[]` structure into a single sorted array of `CountryOption` objects using `useMemo`.
- **Current detection**: On mount and when `countryCode` param changes, finds the matching option via `useEffect` and sets it as `current`.
- **Navigation on change**: `handleChange` calls `updateRegion(country.iso_2, currentPath)`, where `currentPath` is the path after the country code prefix, preserving the page the user is on.
- **Flag display**: `ReactCountryFlag` renders SVG flags for each country option and the current selection.

## Flow

```
CountrySelect({ toggleState, regions })
  ↓ useMemo: flatten regions → countries into sorted CountryOption[]
  ↓ useEffect [countryCode]: set current matching option
  ↓
  render:
    ListboxButton: "Shipping to:" + flag + current.label
    ListboxOptions (conditional Transition):
      options[] → each: flag + label
    onChange(option) → updateRegion(option.country, currentPath) + close()
```

## Integration

- Props: `toggleState: StateType` (from `@lib/hooks/use-toggle-state`), `regions: HttpTypes.StoreRegion[]`
- Calls `updateRegion(countryCode, currentPath)` from `@lib/data/cart`
- Uses `useParams` and `usePathname` from `next/navigation` to derive `countryCode` and `currentPath`
- Uses `ReactCountryFlag` for SVG flag rendering
- Consumed by `SideMenu` component

