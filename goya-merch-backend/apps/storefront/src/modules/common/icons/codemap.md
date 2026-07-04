# goya-merch-backend/apps/storefront/src/modules/common/icons/

## Responsibility

Custom SVG icon set for the storefront. Provides decorative and action icons that are not covered by `@medusajs/icons` or that need custom styling.

## Design

Each icon is a default-exported React FC typed with `IconProps` from `types/icon.ts`:

```ts
export type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>
```

Components accept `size` (default varies per icon, typically `"16"` or `"20"`), `color` (default `"currentColor"`), and spread remaining SVG attributes onto the root `<svg>` element. Icons use `viewBox` and `fill="none"` with `stroke` paths, except where noted. The PayPal icon is a minor exception — it is not typed with `IconProps` and uses hardcoded colors.

## Flow

```tsx
import X from "@modules/common/icons/x"
// <X size={20} color="currentColor" />
```

## Integration

Imported by components in `common/components/` (e.g., `Input` imports `Eye`/`EyeOff`, `Modal` imports `X`) and by feature modules for UI chrome (e.g., `ChevronDown` in navigation, `User` in account header). The `Medusa` and `NextJs` icons are used in the footer/branding.

### Available icons

| File | Export | Default Size | Notes |
|---|---|---|---|
| `back.tsx` | `Back` | 16 | Arrow with circling tail (back navigation) |
| `bancontact.tsx` | `Ideal` | 20 | **Bug:** component name is `Ideal`, not `Bancontact` |
| `chevron-down.tsx` | `ChevronDown` | 16 | Simple chevron pointing down |
| `chevron-up-down.tsx` | `ChevronUpDown` | 16 | Dual arrows up/down (select indicator) |
| `eye.tsx` | `Eye` | 20 | Open eye (show password) |
| `eye-off.tsx` | `EyeOff` | 20 | Eye with slash (hide password) |
| `fast-delivery.tsx` | `FastDelivery` | 16 | Truck icon (shipping) |
| `ideal.tsx` | `Ideal` | 20 | iDEAL payment method logo |
| `map-pin.tsx` | `MapPin` | 20 | Location pin (address) |
| `medusa.tsx` | `Medusa` | 20 | Medusa logo, hardcoded color `#9CA3AF` |
| `nextjs.tsx` | `NextJs` | 20 | Next.js logo, hardcoded color `#9CA3AF` |
| `package.tsx` | `Package` | 20 | Parcel box (order/shipping) |
| `paypal.tsx` | `PayPal` | 20 | PayPal logo; **not typed** with `IconProps`, hardcoded colors |
| `placeholder-image.tsx` | `PlaceholderImage` | 20 | Image placeholder (product galleries) |
| `refresh.tsx` | `Refresh` | 16 | Circular refresh arrows |
| `spinner.tsx` | `Spinner` | 16 | Animated loading spinner (`animate-spin` class) |
| `trash.tsx` | `Trash` | 16 | Trash bin (delete action) |
| `user.tsx` | `User` | 16 | User silhouette (account) |
| `x.tsx` | `X` | 20 | Close/cancel (modal close button) |
