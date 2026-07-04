# goya-merch-backend/apps/backend/src/admin/i18n/

## Responsibility
Internationalization translation overrides for the Medusa admin dashboard. Provides custom i18n resource bundles to modify or extend admin UI text.

## Design
- **i18next Resource Module Pattern**: Exports a single default object conforming to the Medusa admin i18n resource shape — a nested dictionary of translation keys merged into the admin's i18next instance.
- **Stub Implementation**: Currently exports an empty object `{}`, providing no custom translations.

## Flow
1. Medusa admin build discovers `src/admin/i18n/index.ts`.
2. The exported object is deep-merged into the admin panel's i18next resource store.
3. Currently no-ops; ready for future French-language translations or custom text overrides.

## Integration
- **Parent**: `src/admin/` — Admin extension directory.
- **Consumed by**: Medusa admin dashboard i18n pipeline during build.
- **Dependencies**: `react-i18next` (in `package.json`) available for typed translation hooks in custom widgets.
