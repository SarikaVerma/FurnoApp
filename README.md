# Furno — React Native App (MVVM)

## Folder structure

```
furno-app/
├── App.js                     # Navigation root — imports only from src/views
├── package.json
└── src/
    ├── components/            # Shared, reusable UI primitives (not screens)
    │   └── Shared.js          # GradientHeader, PrimaryButton, TabBar, SimpleSlider
    ├── theme.js                # Design tokens: colors, shared constants
    │
    ├── models/                 # Model layer — shapes raw API/JSON data into
    │   ├── Product.js          # clean objects the UI consumes. No logic,
    │   ├── CartItem.js         # no side effects, pure data transforms.
    │   ├── Order.js
    │   ├── User.js
    │   └── Review.js
    │
    ├── services/                # Data-access layer — Axios calls (live backend)
    │   ├── apiClient.js         # or local JSON reads (mocked endpoints).
    │   ├── productsService.js   # ViewModels call these; Views never do.
    │   ├── cartService.js
    │   ├── ordersService.js
    │   ├── userService.js       # mock-backed (no /api/user route yet)
    │   ├── reviewsService.js    # mock-backed
    │   └── categoriesService.js # mock-backed
    │
    ├── viewmodels/               # ViewModel layer — one hook per screen.
    │   ├── useHomeViewModel.js   # Owns state, loading/error handling,
    │   ├── useCartViewModel.js   # and business logic. Calls services,
    │   ├── useProductDetailViewModel.js  # returns models to the View.
    │   ├── useFiltersViewModel.js
    │   ├── useProfileViewModel.js
    │   ├── useLoginViewModel.js
    │   ├── useVerificationViewModel.js
    │   ├── useReviewsViewModel.js
    │   ├── useNotificationsViewModel.js
    │   ├── usePaymentViewModel.js
    │   ├── useWalletViewModel.js
    │   └── useSettingsViewModel.js
    │
    ├── views/                    # View layer — one screen per file.
    │   ├── OnboardingScreen.js   # Pure rendering: calls a ViewModel hook,
    │   ├── LoginScreen.js        # renders what it returns. No axios,
    │   ├── VerificationScreen.js # no data shaping, no business logic.
    │   ├── ProfileScreen.js
    │   ├── HomeScreen.js
    │   ├── FiltersScreen.js
    │   ├── ProductDetailScreen.js
    │   ├── ReviewsScreen.js
    │   ├── CartScreen.js
    │   ├── PaymentScreen.js
    │   ├── NotificationsScreen.js
    │   ├── WalletScreen.js
    │   └── SettingsScreen.js
    │
    └── data/                      # Local JSON mocks for screens without a
        ├── user.json               # live backend route yet (user, reviews,
        ├── reviews.json             # categories). Swap the service body for
        └── categories.json          # a real apiClient call when ready —
                                       # nothing above the service layer changes.
```

## The MVVM contract

- **Model** — no imports from services/viewmodels/views. Pure functions that normalize raw data.
- **Service** — no React, no UI state. Only data access (Axios or local JSON), returns raw/model data.
- **ViewModel** — a `use*()` hook. Owns `useState`/`useEffect`, calls services, returns primitives + functions. Never imports `react-native` UI components.
- **View** — a screen component. Calls exactly one ViewModel hook, renders JSX. Never imports `axios` or a service directly.

## Setup

```
npm install
```

Point the app at your backend in `src/services/apiClient.js` — the `BASE_URL` defaults to `http://localhost:4000/api`. For a physical device, replace `localhost` with your machine's LAN IP.

Run with Expo:
```
npx expo start
```

## What's live vs. mocked

| Feature | Backed by |
|---|---|
| Products, Cart, Checkout | Live Express/SQLite backend via Axios |
| Profile, Wallet balance, Payment methods | `src/data/user.json` (mock) |
| Reviews | `src/data/reviews.json` (mock) |
| Filter categories | `src/data/categories.json` (mock) |

To connect a mocked feature to a real backend later, edit only the corresponding file in `src/services/` — the ViewModel and View layers don't need to change.
