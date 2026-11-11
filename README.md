# NOVA Store

Public storefront of the NOVA shop, built for the NOVA frontend technical
challenge: a landing page with a searchable, sortable, paginated product list
and a persistent shopping cart. Data comes from the public
[FakeStoreAPI](https://fakestoreapi.com/docs).

## Stack

| Area      | Choice                                                       |
| --------- | ------------------------------------------------------------ |
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict)       |
| i18n      | next-intl: `/fa` (RTL, default) and `/en` (LTR)              |
| Styling   | styled-components with an SSR style registry                 |
| State     | Zustand (cart, catalog filters), Context API (theme)         |
| HTTP      | Axios, one shared `axiosInstance`                            |
| Forms     | Formik + Yup (newsletter)                                    |
| SEO       | Metadata API, `robots.ts`, `sitemap.ts`, hreflang alternates |
| Tooling   | ESLint (next config), Prettier, pnpm                         |

## Getting started

Requirements: Node.js 20.9+ and pnpm 10.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Script           | Purpose                    |
| ---------------- | -------------------------- |
| `pnpm dev`       | Development server         |
| `pnpm build`     | Production build           |
| `pnpm start`     | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit`             |
| `pnpm lint`      | ESLint                     |
| `pnpm format`    | Prettier                   |

### Environment

| Variable                   | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the API, without trailing slash            |
| `NEXT_PUBLIC_SITE_URL`     | Public origin of the store (metadata, robots, sitemap) |

Both are public by nature, so the `NEXT_PUBLIC_` prefix is appropriate; the
project has no secrets. `src/utils/env.ts` is the only place that reads them
and fails fast when one is missing.

## Features

- **Landing page** (public, no login): header with logo, navigation, category
  menu, search, language switch, theme toggle and cart counter; hero banner;
  category chips; product cards with image, title, category, rating and price;
  newsletter form; footer.
- **Search, category filter, sorting** (price and title, both directions) and
  **pagination** with 6 products per page.
- **Cart**: add from any card, increase / decrease (never below 1), remove a
  row, empty the cart with a confirmation dialog, line totals and grand total,
  empty state. The cart survives a refresh.
- **Persian / English** with locale-prefixed URLs and correct direction, and a
  **light / dark** theme without a flash on load.
- **Responsive**, mobile first: checked at 375px, tablet and desktop widths
  with no horizontal scroll.
- **States**: loading, error with retry, empty and no-result views.

## Folder structure

```
src/
├── api/             axiosInstance, ApiError, endpoints
├── app/
│   ├── [locale]/    layout, landing page, cart, not-found, error
│   ├── globals.css  reset and theme color variables
│   ├── robots.ts
│   └── sitemap.ts
├── assets/          Fonts, Icons, Images
├── components/      Page-specific components: layout/, home/, cart/
│                    (each page: index.tsx for JSX + index.hook.ts for logic)
├── context/         Theme context, styled-components registry, cart hydrator
├── dictionary/      fa.json, en.json (next-intl messages)
├── modals/          Mobile menu drawer, confirm dialog
├── requests/        Typed request functions built on axiosInstance
├── shared/          Reusable UI: Button, ProductCard, Pagination, …
├── storage/         Safe localStorage wrapper, theme persistence
├── types/           Domain types; enums/ holds every enum
├── utils/           UI-independent logic: catalog, cart math, formatters, routing
├── validations/     Yup schemas
├── zustand/         cart.store.ts, catalog.store.ts
├── i18n.ts          next-intl request configuration
└── proxy.ts         Locale negotiation and redirects
```

Deviations from the proposed structure, and why:

- **`src/proxy.ts` instead of a root-level `proxy.ts`.** Next.js requires the
  proxy file to sit next to `app`, which is inside `src` here.
- **`src/zustand/`.** The challenge's responsibility table lists Zustand as a
  location but the tree does not show a folder for it; stores live here.
- **Routing helpers in `utils/`.** `utils/routing.ts` (locale list) and
  `utils/navigation.ts` (locale-aware `Link`/`useRouter`) are shared by
  `i18n.ts`, `proxy.ts` and components, so they are kept out of all three.

## Architecture

```
FakeStoreAPI → api/axiosInstance → requests/* → page (server) or page hook (client) → components
```

- **Server first.** `app/[locale]/page.tsx` is a Server Component. It fetches
  the catalog and passes it to the client view, so products are in the initial
  HTML. Pages are statically generated per locale and revalidated hourly.
- **Resilient to API failure.** If the server-side request fails, the page
  still renders and the client retries, with its own loading and error states.
- **One HTTP client.** `axiosInstance` uses the `fetch` adapter, so the same
  instance works in Server Components and in the browser. Its response
  interceptor turns every failure into an `ApiError` carrying an
  `ApiErrorCode`; the UI maps that code to a translated message.
- **Logic outside JSX.** Filtering, sorting, paging and cart totals are pure
  functions in `utils/`. Each page has a hook (`index.hook.ts`) that wires
  stores and utils together; components only render.

### State management

| State                                | Where                                  |
| ------------------------------------ | -------------------------------------- |
| Cart                                 | Zustand, persisted to `localStorage`   |
| Search, category, sort, page         | Zustand (shared by header and landing) |
| Theme mode                           | Context API                            |
| Menu open, "added" feedback, dialogs | `useState`                             |
| Newsletter form                      | Formik                                 |

Two details worth knowing:

- **Cart hydration.** The store uses `skipHydration` and is rehydrated after
  mount. The server HTML and the first client render therefore agree, and
  cart-dependent UI waits for a `hydrated` flag instead of flashing "empty".
- **Theme without a flash.** Colors are CSS variables keyed by
  `<html data-theme>`. A small inline script sets the attribute from the saved
  choice (or the system preference) before first paint, so pages can stay
  static. The context reads that attribute through `useSyncExternalStore`.

### Styling

styled-components runs in Client Components. `context/StyledRegistry.tsx`
collects the generated rules during server rendering and injects them into the
HTML stream, and `compiler.styledComponents` is enabled in `next.config.ts`.
Layout uses CSS logical properties only, so RTL and LTR share the same styles.

### SEO

- `generateMetadata` per locale: title template, description, `metadataBase`,
  Open Graph, canonical URL and `hreflang` alternates (including `x-default`).
- `app/robots.ts` allows the storefront and disallows the cart.
- `app/sitemap.ts` lists the landing page for each locale with its alternates.
- The cart page is `noindex`: its content is personal and client-only.
- Semantic landmarks, a single `h1` per page and a skip link.

## FakeStoreAPI limitations and how they are handled

- **No paging, search or sorting parameters.** All three run on the fetched
  list in `utils/catalog.ts`.
- **Product text is English only.** UI text and the four known categories are
  translated; titles come from the API as they are.
- **Prices are plain numbers.** They are shown as US dollars, formatted with
  the digits of the active language. Totals are summed in cents to avoid
  floating point drift.
- **No cart or newsletter endpoints.** The cart lives in `localStorage`
  (non-sensitive data). The newsletter form validates and confirms on screen
  only.
- **No ordering.** The checkout button is shown disabled with a note.

## Assumptions and scope

- Filters live in a Zustand store, as the challenge asks for Zustand as the
  global state. The trade-off is that a filtered view is not shareable by URL;
  with more time I would mirror them into search params.
- Footer help and social links are display-only, as the challenge permits.
- The hero illustration is an inline SVG, to avoid shipping stock photos.
- Payment, orders, customer login and a product detail page are out of scope.
- Time spent: about 12 hours, including code review and manual testing.
