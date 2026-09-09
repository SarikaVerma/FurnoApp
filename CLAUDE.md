# Furno — React Native Furniture App

Training POC for a React Native course. Expo-based, fully offline (no backend),
built with an MVVM architecture. Primarily developed/tested via Snack
(snack.expo.dev), which has caused several environment-specific bugs — see
"Known issues & history" below before assuming a bug is in the app logic.

## Architecture: MVVM

Strict layering — each layer only imports from the ones below it in this list:

```
src/views/         Screen components. Render only. Call exactly one
                    ViewModel hook, render what it returns. NEVER import
                    a service or axios directly, never hold business logic.

src/viewmodels/     One use*ViewModel() hook per screen. Owns useState/
                    useEffect, calls services, returns primitives + functions
                    to the View. NEVER imports react-native UI components.

src/services/       Data access only. Currently all local — reads JSON from
                    src/data/ or holds in-memory state (cart, orders).
                    NEVER contains React state or UI logic.

src/models/         Pure functions that normalize raw data (e.g. snake_case
                    was_price -> camelCase wasPrice) into the shape Views
                    expect. No side effects, no imports from other layers.

src/components/     Shared UI primitives used across screens (GradientHeader,
                    PrimaryButton, TabBar, SimpleSlider) — not full screens.

src/theme.js        Design tokens: colors, spacing constants.
```

When fixing a bug or adding a feature, respect this boundary — e.g. a new
"favorites" feature needs a model + service + viewmodel + view, not logic
bolted directly into a screen component.

## Data: fully offline, no backend

- `src/services/productsService.js` reads `src/data/products.json` (10 items).
- `src/services/cartService.js` and `ordersService.js` hold state in a
  module-level in-memory array — resets on app reload. This is intentional
  for the training POC; do not silently reintroduce a network call.
- `src/services/userService.js`, `reviewsService.js`, `categoriesService.js`
  are mock-backed the same way, reading `src/data/*.json`.
- `src/services/apiClient.js` exists but is currently unused by anything —
  it's a leftover Axios client from an earlier iteration that had a real
  Express/SQLite backend (see `furno-backend/` sibling project, not part of
  this app). Do not wire services back to it unless explicitly asked.

## Navigation

`App.js` uses `@react-navigation/stack` (the **JS-only** stack navigator),
NOT `@react-navigation/native-stack`. This is deliberate:
`native-stack` depends on `react-native-screens`' native module, which
throws `TurboModuleRegistry.getEnforcing(...): 'PlatformConstants' could not
be found` in Expo Snack's bridgeless runtime. Do not "fix" this by switching
back to native-stack unless testing outside Snack in a real dev build.

## Known issues & history (read before debugging layout)

This project hit a long chain of Snack-specific environment issues, in order:

1. **`@react-native-community/slider` crashed with the same
   TurboModuleRegistry/PlatformConstants error** — replaced with a pure-JS
   `SimpleSlider` in `src/components/Shared.js` (uses `PanResponder`, no
   native module). Don't reintroduce a native slider package.

2. **`@react-navigation/native-stack` hit the same TurboModule error** —
   replaced with `@react-navigation/stack` in `App.js` (see Navigation above).

3. **Axios calls to a LAN-IP backend failed with "Network Error"** in Snack's
   Web preview specifically — root cause was HTTPS (Snack) calling HTTP
   (local backend), blocked as mixed content by the browser. Resolved by
   removing the backend dependency entirely and going fully offline
   (see "Data" above) rather than chasing ngrok/HTTPS tunneling further.

4. **Deprecated `SafeAreaView` from `'react-native'` core** was suspected of
   not properly forwarding height/flex styles on `react-native-web`. All
   screens now import `SafeAreaView` from `react-native-safe-area-context`
   instead, and `App.js` wraps everything in `<SafeAreaProvider>`. If you see
   `SafeAreaView` imported from `"react-native"` in any file, that's a
   regression — fix the import.

5. **UNRESOLVED as of this writing: Home screen's product list renders as
   one long page instead of scrolling within a bounded area between the
   header and the bottom tab bar, and the tab bar is not reachable.**
   Attempted fixes, in order, none of which the user confirmed as working:
   - `contentContainerStyle={{ paddingBottom: 24 }}` on the ScrollView
   - `minHeight: 0` on the ScrollView style (the standard CSS-flexbox fix
     for a flex child expanding to content size instead of shrinking)
   - Wrapping the app root in a `View` with `height: '100vh'` (web only)
   - Replacing `100vh` with `useWindowDimensions().height` (vh can resolve
     incorrectly inside Snack's nested iframe embedding)
   - Switching `SafeAreaView` to `react-native-safe-area-context` (see #4)

   **This is the priority bug to fix.** Given the pattern of fixes not
   visibly taking effect despite being individually correct, seriously
   consider whether this is actually a stale-bundle/cache issue in Snack
   rather than a code issue — test locally with `npx expo start --web`
   outside of Snack first, using browser DevTools to inspect the actual
   computed CSS height/overflow on the ScrollView's DOM node, before writing
   more speculative style fixes.

## Environment notes

- Node.js + Expo SDK ~51.
- `npm install` then `npx expo start` (add `-c` to clear Metro cache if a
  fix doesn't seem to apply — this project has repeatedly hit stale-cache
  symptoms in Snack specifically).
- Prefer testing locally over Snack when debugging layout/styling issues —
  Snack's iframe embedding, cache behavior, and lack of real DevTools access
  (this project was primarily tested in Safari, which needs manual Web
  Inspector setup) have been a significant source of wasted debugging time.
