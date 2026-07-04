# goya-merch-backend/apps/backend/src/admin/

## Responsibility
Admin dashboard extensions for the Medusa admin panel. Provides widget configuration and i18n translation extensions to customize the admin UI.

## Design
- **Medusa Admin Extension Pattern**: The directory structure and files follow Medusa 2.0 conventions for admin customizations — `i18n/` for translations, optional widget/route components.
- **Separate TypeScript Configuration**: Uses its own `tsconfig.json` targeting ES2020 with JSX support for React components, using bundler module resolution (Vite-based admin build).

## Flow
1. Medusa admin builder scans `src/admin/` at build time for widgets, routes, and i18n files.
2. Translations defined in `i18n/` are merged into the admin panel's i18next instance.
3. Currently only an empty i18n export exists — no custom widgets or routes are defined.

## Integration
- **Parent**: `src/` — part of the Medusa application source tree.
- **Child**: `i18n/` — Translation overrides for the admin dashboard (currently a stub).
- **Consumed by**: Medusa admin dashboard build process (Vite-based, bundled separately from the backend server).
