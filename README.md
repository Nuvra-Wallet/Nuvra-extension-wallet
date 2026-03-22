# NUVRA Wallet

A full-featured crypto wallet app UI built with React + Vite. Dark fintech theme with orange accents.

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`

## Project Structure

```
nuvra-wallet/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Router + phone frame
    ├── styles/
    │   └── global.css        # All shared styles + animations
    ├── data/
    │   └── constants.js      # Tokens, assets, transactions, projects
    ├── components/
    │   └── SharedComponents.jsx  # StatusBar, BackBtn, BottomNav, TokenModal, etc.
    └── screens/
        ├── OnboardingScreen.jsx  # 3 intro splash screens
        ├── SignUpScreen.jsx      # Email → Verify → Referral code
        ├── PinScreen.jsx         # 4-digit PIN set + unlock
        ├── HomeScreen.jsx        # Dashboard, balance, assets, QR modal
        ├── SendScreen.jsx        # Send flow: details → processing → receipt
        ├── SwapScreen.jsx        # Swap flow: input → confirm → processing → success
        ├── ActivityScreen.jsx    # Transaction history + detail view
        └── DiscoverScreen.jsx    # Featured, trending, projects, detail
```

## Design System

| Token        | Value                          |
|-------------|-------------------------------|
| Primary     | `#ff7a2f` (orange gradient)   |
| Background  | `#0d0d14`                     |
| Surface     | `rgba(255,255,255,0.03–0.07)` |
| Success     | `#1fd090`                     |
| Error       | `#e84000`                     |
| Font (display) | Syne 700/800                |
| Font (body)    | DM Sans 400/500/600          |

## Screens

1. **Onboarding** — 3 animated splash screens with illustrations + dot nav
2. **Sign Up** — multi-step form with email, password, verify, referral code
3. **PIN** — 4-digit PIN entry with lock animation, shake on error, biometrics button
4. **Home** — portfolio balance, sparkline chart, quick actions, asset list, QR top-up modal
5. **Send** — recipient selector, token picker, amount input, processing ring, receipt
6. **Swap** — token pair input, live rate calc, slide-to-swap confirmation, success screen
7. **Activity** — filterable transaction feed, status pills, detail view with all tx data
8. **Discover** — featured project cards, trending tokens, category filter, project detail

## Customizing

- **Tokens**: Edit `src/data/constants.js` → `TOKENS` and `ASSETS`
- **Colors**: Change `#ff7a2f` in `global.css` or inline styles
- **Transactions**: Edit `TRANSACTIONS` in constants for the Activity feed
- **Projects**: Edit `PROJECTS` in constants for the Discover screen
