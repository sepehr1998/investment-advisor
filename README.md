# FA Platform — Investor Browser

A production-quality React + TypeScript web application that lets an authenticated investment advisor browse contacts, portfolios, and transactions.

---

## Setup instructions

### Prerequisites
- Node.js 18+
- Access to the FA Solutions demo environment

### Install and run

```bash
git clone <repo-url>
cd investment-advisor
npm install
```

Copy the environment file and fill in your values:

```bash
cp .env.example .env
```

`.env` variables:

```
VITE_KEYCLOAK_URL=https://tryme.fasolutions.com/auth
VITE_KEYCLOAK_REALM=fa
VITE_KEYCLOAK_CLIENT_ID=external-api
VITE_GRAPHQL_URL=https://tryme.fasolutions.com/api/graphql
```

Start the development server:

```bash
npm run dev
```

Run tests:

```bash
npm run test        # watch mode
npm run test:run    # single run
```

Type-check:

```bash
npx tsc --noEmit
```

---

## Architecture overview

The project follows a feature-based folder structure under `src/`:

```
src/
  app/        — Router and QueryClient provider setup
  auth/       — Keycloak integration, auth context, protected route guard
  api/        — GraphQL client, query documents, and manually-typed response types
  features/   — contacts/, portfolios/, transactions/
                each owns its hooks, components, and types
  components/ — Shared UI primitives (EmptyState, ErrorState, ErrorBoundary)
                and layout components (TopNav, Breadcrumb, three-column shell)
  lib/        — Pure utility functions (formatters, constants)
  pages/      — Full-page route components used on mobile
  mocks/      — MSW request handlers and fixture data for tests
```

**Auth layer** (`src/auth/`) is isolated from the rest of the app. Everything inside the router is wrapped in `ProtectedRoute`, which checks the Keycloak `isAuthenticated` flag. The GraphQL client reads the current token at request time via a header function so it always uses the latest refreshed token. A `setInterval` in the auth provider silently refreshes the token every 30 seconds to prevent expiry mid-session.

**API layer** (`src/api/`) is a thin wrapper: a pre-configured `graphql-request` client plus hand-written TypeScript interfaces (generated types were not available because the schema requires authentication). Query documents live in `.graphql` files and are exported from `src/api/generated/`.

**Feature modules** keep their data hooks, components, and types co-located. Hooks are the only things that touch the API layer — components never import the GraphQL client directly.

**Layout** (`src/components/layout/`) uses a responsive three-column shell on desktop (`lg:` breakpoint and above) and an outlet-based drill-down on mobile. The shell reads URL params to determine which columns to show content in.

---

## Data fetching strategy

Data is loaded progressively in response to user selection, never speculatively:

1. **On app load** — `useContacts` fires immediately and populates the contacts column.
2. **On contact selection** — `usePortfolios(contactId)` fires when a contact is clicked (`enabled: !!contactId`). Portfolios for that contact appear in the portfolios column.
3. **On portfolio selection** — `useTransactions(portfolioId)` fires when a portfolio is clicked (`enabled: !!portfolioId`). Transactions appear in the right column.

This matters in a real advisor platform because an advisor may manage hundreds of contacts, each with multiple portfolios containing thousands of transactions. Loading everything upfront would be prohibitively slow and wasteful. The progressive model keeps the initial page load fast regardless of data volume.

TanStack Query caches each result by its key (`['contacts', params]`, `['portfolios', contactId]`, `['transactions', portfolioId]`). Navigating back to a previously visited contact shows its portfolios instantly from cache (stale time: 5 minutes) — no loading state, no extra API call.

---

## Key decisions

### TanStack Query + graphql-request instead of Apollo Client

Apollo Client ships a full state management runtime with a normalized cache, reactive variables, and its own provider. For a read-only browser that never writes data back, this is significant overhead. TanStack Query paired with the lightweight `graphql-request` client gives the same caching, loading, and error state management with a fraction of the bundle size and configuration surface area.

### URL-based routing instead of local state

Selection state (which contact, which portfolio) lives in the URL (`/contacts/:contactId/portfolios/:portfolioId`). This means the browser back button works at every level, refreshing the page restores your position in the drill-down, and deep links work out of the box. A local-state approach would lose all of this.

### Holdings explicitly out of scope

Holdings data requires real-time valuation against current market prices, adding significant complexity (live price feeds, currency conversion, position aggregation). It is a distinct product surface — a portfolio valuation dashboard — and including it would blur the focus of this application, which is transaction history browsing.

---

## Financial data presentation

### Type-aware column logic

The transactions table renders differently based on `typeCode`:

- **BUY / SELL**: show `price` (the per-unit trade price)
- **DIVIDEND / COUPON**: show `—` for price because these are income events, not trades — the concept of a per-unit price is not meaningful

### Amount sign convention

Amount sign display is purely presentational — the raw value from the API is shown as-is:
- BUY is an outflow (money leaves the portfolio to acquire an asset)
- SELL, DIVIDEND, and COUPON are inflows

### Transaction type badge

Each `typeCode` maps to a distinct color:

| Type     | Label    | Color  |
|----------|----------|--------|
| BUY      | Buy      | Green  |
| SELL     | Sell     | Red    |
| DIVIDEND | Dividend | Amber  |
| COUPON   | Coupon   | Blue   |
| Other    | raw code | Gray   |

Unknown type codes render the raw value in gray so the UI degrades gracefully when new types are introduced on the backend.

---

## Future improvements

- **Holdings view** — show current positions with market value per portfolio
- **Portfolio valuation summary** — total NAV, return since inception, benchmark comparison
- **Advanced date-range filtering** — filter transactions by settlement date or effective date range
- **Export to CSV** — download transaction history for a selected portfolio
- **Virtualized transaction table** — use a windowed list for portfolios with thousands of transactions to keep the DOM lean and scrolling smooth
