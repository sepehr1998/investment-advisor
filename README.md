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
  app/        — Router (with lazy-loaded routes) and QueryClient provider setup
  auth/       — Keycloak integration, auth context, protected route guard
  api/        — GraphQL client, query documents, and manually-typed response types
  features/   — contacts/, portfolios/, transactions/
                each owns its hooks, components, and types
  components/ — Shared UI primitives (EmptyState, ErrorState, ErrorBoundary,
                Pagination, Spinner) and layout components (TopNav, Breadcrumb)
  lib/        — Pure utility functions (formatters, constants)
  pages/      — Full-page route components (ContactsPage, PortfoliosPage, TransactionsPage)
  mocks/      — MSW request handlers and fixture data for tests
```

**Auth layer** (`src/auth/`) is isolated from the rest of the app. Everything inside the router is wrapped in `ProtectedRoute`, which checks the Keycloak `isAuthenticated` flag. The GraphQL client reads the current token at request time via a header function so it always uses the latest refreshed token. A `setInterval` in the auth provider silently refreshes the token every 30 seconds to prevent expiry mid-session.

**API layer** (`src/api/`) is a thin wrapper: a pre-configured `graphql-request` client plus hand-written TypeScript interfaces (generated types were not available because the schema requires authentication). Query documents live in `src/api/generated/`.

**Feature modules** keep their data hooks, components, and types co-located. Hooks are the only things that touch the API layer — components never import the GraphQL client directly.

**Page layout** — each page uses a two-column layout: a fixed-width filter sidebar on the left and the main content area on the right. The sidebar is always visible; no toggle required.

---

## Data fetching strategy

Data is loaded progressively in response to user selection, never speculatively:

1. **On app load** — `useContacts` fires immediately and populates the contacts list.
2. **On contact selection** — `usePortfoliosByParameters` fires when a contact is clicked, scoped to that contact's portfolio IDs. If the contact has no portfolios, an empty state is shown immediately.
3. **On portfolio selection** — `useTransactions(portfolioId)` fires when a portfolio is clicked (`enabled: !!portfolioId`). Transactions appear in the main content area.

This matters in a real advisor platform because an advisor may manage hundreds of contacts, each with multiple portfolios containing thousands of transactions. Loading everything upfront would be prohibitively slow and wasteful. The progressive model keeps the initial page load fast regardless of data volume.

TanStack Query caches each result by its key (`['contacts', params]`, `['portfolios-by-parameters', params]`, `['transactions', portfolioId, params]`). Navigating back to a previously visited contact shows its portfolios instantly from cache (stale time: 5 minutes) — no loading state, no extra API call.

All queries include `resultSize: 500` to cap the response size at a sensible maximum and prevent the server from sending unbounded payloads.

`keepPreviousData` is enabled on all three queries so that when filters change or a page turn occurs, the previous results remain visible while the new request is in-flight rather than being replaced by a loading skeleton.

---

## Filtering

Each of the three pages has a persistent filter sidebar. Filtering uses a **draft / applied state split**:

- **Draft state** — updated on every keystroke/selection in the sidebar inputs, but does not trigger a query.
- **Applied state** — committed when the user clicks "Apply filters" or presses Enter. Only applied state drives the API query.

This prevents a network request per keystroke and gives the user control over when to submit. Active applied filters are displayed as dismissible chips above the results so the user always knows what is currently filtered. Individual chips can be removed without clearing all filters.

---

## Pagination and note for reviewers

Contacts are paginated at **12 per page** (4 rows of 3); transactions at **20 per page**. Applying new filters or changing the sort column resets to page 1 automatically.

> **Note for reviewers:** The per-page limits have been intentionally kept small so that pagination is visible and demonstrable in the test environment, which contains a limited dataset. In a production environment these values would typically be larger (e.g. 50–100 per page).

---

## Sorting

The transactions table supports column sorting. Clicking a column header sorts by that column ascending; clicking again reverses the direction. The active sort column is highlighted in blue with a directional chevron. Null values always sort to the bottom regardless of direction. Changing the sort resets to page 1.

---

## Key decisions

### TanStack Query + graphql-request instead of Apollo Client

Apollo Client ships a full state management runtime with a normalized cache, reactive variables, and its own provider. For a read-only browser that never writes data back, this is significant overhead. TanStack Query paired with the lightweight `graphql-request` client gives the same caching, loading, and error state management with a fraction of the bundle size and configuration surface area.

### Dynamic inline GraphQL query building for contacts and portfolios

The `contactsByParameters` endpoint accepts parameters as inline object literals in the query string rather than as a typed GraphQL variable. Building the query dynamically in the hook (only including fields that are actually set) avoids sending empty/null parameters and keeps the request minimal. Transactions use a proper typed variable (`$parameters: transactionParametersInput`) which the server schema supports directly.

### URL-based routing instead of local state

Selection state (which contact, which portfolio) lives in the URL (`/contacts/:contactId/portfolios/:portfolioId`). This means the browser back button works at every level, refreshing the page restores your position in the drill-down, and deep links work out of the box.

### Route-based code splitting

Each page component is lazy-loaded via `React.lazy` + `Suspense`. The contacts, portfolios, and transactions bundles are only downloaded when first navigated to, keeping the initial load bundle small.

### Holdings explicitly out of scope

Holdings data requires real-time valuation against current market prices, adding significant complexity (live price feeds, currency conversion, position aggregation). It is a distinct product surface — a portfolio valuation dashboard — and including it would blur the focus of this application, which is transaction history browsing.

---

## Financial data presentation

### Type-aware column logic

The transactions table renders differently based on `typeCode`:

- **BUY / SELL**: show `price` (the per-unit trade price)
- **DIVIDEND / COUPON**: show `—` for price because these are income events, not trades — the concept of a per-unit price is not meaningful

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

### Portfolio status badge

Each portfolio card displays a status badge: **Active** (green) for status `A`, **Inactive** (grey) for status `I`. Unknown status values render the raw code in grey.

---

## Performance optimisations

- **Route-based code splitting** — page bundles are loaded on demand via `React.lazy`
- **`keepPreviousData`** — previous query results stay visible during refetch, eliminating flash-of-empty on filter/page changes
- **`useMemo` on sorted arrays** — contact, portfolio, and transaction lists are only re-sorted when the underlying data changes, not on every render
- **`React.memo` on sidebar and list components** — prevents re-renders when parent state unrelated to those components changes (e.g. draft filter input changes don't re-render the results list)
- **`useCallback` on handlers** — stable function references ensure memoized children don't re-render unnecessarily
- **`resultSize: 500`** — caps server responses to prevent unbounded payloads

---

## Future improvements

- **Holdings view** — show current positions with market value per portfolio
- **Portfolio valuation summary** — total NAV, return since inception, benchmark comparison
- **Export to CSV** — download transaction history for a selected portfolio
- **Transaction quantity and amount** — extend the transaction table with quantity (units) and total amount (price × quantity) for a more complete picture of each trade
