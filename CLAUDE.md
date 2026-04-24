@AGENTS.md

# Foundry

**A production-grade SaaS starter template.** Next.js 16 · React 19 · Tailwind 4 · TypeScript strict. No integrations pre-wired out of the box; the stack is decided (Supabase + Resend + Stripe) but not yet installed. Opinionated shells, a 43-component design system, and enforced architectural boundaries, ready to fork.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Directory Layout](#directory-layout)
3. [Architectural Boundaries](#architectural-boundaries)
4. [Routing Structure](#routing-structure)
5. [Data Flow Patterns](#data-flow-patterns)
6. [Component Hierarchy](#component-hierarchy)
7. [Proxy Configuration](#proxy-configuration)
8. [Naming Conventions](#naming-conventions)
9. [Working on Foundry](#working-on-foundry)
10. [Scripts](#scripts)
11. [Environment](#environment)
12. [Stack Decisions](#stack-decisions)
13. [Conventions Claude Must Follow](#conventions-claude-must-follow)

---

## Tech Stack

Pinned in `package.json`:

| Dependency | Version | Role |
|---|---|---|
| `next` | `16.2.4` | App Router, Server Components, Server Actions, `proxy.ts` |
| `react`, `react-dom` | `19.2.4` | RSC + use client boundary |
| `@phosphor-icons/react` | `^2.1.10` | Icon set used across base/common components |
| `tailwindcss`, `@tailwindcss/postcss` | `^4` | Utility styling, token layer in `globals.css` |
| `typescript` | `^5` | Strict mode on |
| `eslint`, `eslint-config-next` | `^9`, `16.2.4` | Flat config + import boundary rules |

**Decided but not yet installed** (see [Stack Decisions](#stack-decisions)): Supabase (`@supabase/supabase-js`, `@supabase/ssr`), Resend (`resend`, `react-email`, `@react-email/components`), Stripe (`stripe`), Zod.

**Why this stack.** Next 16 + React 19 gives Server Components with async `params`, Server Actions as the mutation primitive, and the new `proxy.ts` replacing `middleware.ts`. Tailwind 4 uses the `@tailwindcss/postcss` plugin and theme tokens in CSS. `pnpm` is the package manager (workspace enabled via `pnpm-workspace.yaml`).

> **Next 16 warning.** This is not the Next.js you may have trained on. `params` is async, `middleware.ts` is replaced by `proxy.ts`, cache semantics changed. When in doubt, read `node_modules/next/dist/docs/` before writing code.

---

## Directory Layout

```
src/
  app/               # App Router routes + layouts + global CSS
  components/        # Design system: base/, common/, layout/, brand/
  features/          # Co-located domain modules (auth, billing, dashboard, ...)
  lib/               # Framework-agnostic utilities
  server/            # Server-only code (db, auth, email, stripe)
  hooks/             # Shared React hooks
  types/             # Cross-cutting TypeScript types
  config/            # Static configuration (brand, features, navigation, site)
  styles/            # Font loaders
  proxy.ts           # Edge-level auth + tenant routing
  env.ts             # Runtime env accessor
public/
  brand/             # Logo, wordmark, OG image (SVG)
  avatars/           # Seed avatar images
  icons/             # Generic icon assets
  social/            # Social provider logos
```

### `src/app/` — routes and layouts
Next.js App Router tree. Route groups `(auth)`, `(marketing)`, `(protected)` segment layouts; `[workspace]` under `(protected)/` is the multi-tenant dynamic segment. `api/` holds route handlers (`api/health/route.ts`, `api/webhooks/stripe/`). `design/` is a dev-only design-system preview.
- **Belongs here:** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `global-error.tsx`, and the global CSS entry.
- **Not here:** reusable components, business logic. Pages compose components from `@/components/*` and `@/features/*/components/*`.
- **Example:** `src/app/(protected)/[workspace]/dashboard/page.tsx` is a Server Component that imports `getDashboardStats` from `@/features/dashboard/queries`.

### `src/components/` — design system
Four folders, each with a single responsibility:
- `base/` — 20 unstyled primitives (`button.tsx`, `badge.tsx`, `icon.tsx`, `text.tsx`, 9 `frame-*` variants, etc.).
- `common/` — 23 composites built from `base/` (`input-address.tsx`, `card.tsx`, `search-popup.tsx`, `tooltip.tsx`, etc.).
- `layout/` — 7 page shells (`app-shell.tsx`, `app-sidebar.tsx`, `app-topbar.tsx`, `marketing-header.tsx`, `marketing-footer.tsx`, `auth-shell.tsx`, `app-right-panel.tsx`).
- `brand/` — brand-owned components independent of app state (`brand-logo.tsx`).

**Not here:** feature-specific components (those live in `features/<name>/components/`), server-only code.
**Example:** `src/components/common/input-address.tsx` composes `base/input` + `base/frame-text` to render a compound address field.

### `src/features/<name>/` — domain modules
Each feature is self-contained. Canonical layout:
```
features/<name>/
  components/    # React components scoped to this feature
  actions.ts     # "use server" mutations
  queries.ts     # import "server-only" reads
  schemas.ts     # Input validation schemas (placeholder, will be Zod)
  types.ts       # Shared TS types for this feature
```
- **Belongs here:** everything about a single domain concern.
- **Not here:** cross-feature shared code (move to `lib/`, `server/`, or `components/common/`).
- **Example:** `src/features/billing/queries.ts` (server-only reads), `src/features/billing/components/pricing-table.tsx`.

Existing features: `auth`, `billing`, `dashboard`, `marketing`, `settings`, `workspaces`. Note: `workspaces/` currently has no `components/` folder because it is server-side only today.

### `src/lib/` — framework-agnostic utilities
Pure TypeScript helpers usable anywhere. ESLint forbids importing `@/server/*`, `next`, `next/*`, `react`, or `react-dom` here.
- `cn.ts` — class joiner (`filter(Boolean).join(" ")`; **not** tailwind-merge, no conflict resolution).
- `utils.ts`, `constants.ts` — generic helpers.
- `format/` — `currency`, `date`, `number` formatters.
- `validation/` — `schemas`, `reserved-slugs` (used by `proxy.ts` and the workspace layout).
**Not here:** anything that touches the DB, the filesystem, `next/*`, React, or `server/*`.

### `src/server/` — server-only code
Everything here must have `import "server-only"` at the top. Never imported by client components (ESLint-enforced).
- `auth/` — `providers.ts`, `proxy-helpers.ts` (used by `proxy.ts`), `session.ts`. Will be wired to Supabase Auth.
- `db/` — `client.ts`, `schema.ts`, `queries/` (empty today; schema will live in `supabase/migrations/*` once Supabase is initialized).
- `email/` — `client.ts`, `templates/` (empty today; templates will be `react-email` components).
- `stripe/` — `client.ts`.

### `src/hooks/` — shared hooks
`use-current-user.ts`, `use-debounce.ts`, `use-local-storage.ts`, `use-media-query.ts`. Client-only (subject to the same ESLint import ban on `@/server/*`).

### `src/types/` — cross-cutting types
- `api.ts` — exports `ApiResult<T>`, the Server Action return contract.
- `common.ts`, `database.ts` — shared scalar types. `database.ts` will eventually be replaced by `supabase gen types typescript --local` output.

### `src/config/` — static configuration
Compile-time config, not runtime secrets.
- `brand.ts` — single source of truth for product identity (name, description, URL, logo paths, OG image, Twitter handle).
- `features.ts` — feature flag toggles (`billing`, `analytics`, `apiKeys`, `teamManagement`, `notifications`).
- `navigation.ts` — marketing nav array + `buildAppNav(workspace)` and `buildSettingsNav(workspace)` helpers.
- `site.ts` — site-level metadata.

### `src/styles/` — fonts
`fonts.ts` exports the configured Next font loader (Inter). Referenced by the root layout.

### `public/`
Static assets served from the site root. `public/brand/`, `public/avatars/`, `public/icons/`, `public/social/` are all excluded from the proxy matcher.

---

## Architectural Boundaries

Enforced by ESLint `no-restricted-imports` in `eslint.config.mjs`:

```
+-------------------------------------------------------------+
|  PROXY LAYER                                                |
|  src/proxy.ts                                               |
|  X @/components/*  X @/hooks/*  X @/features/*              |
|  v @/server/*  v next/server  v @/lib/validation/*          |
+-------------------------------------------------------------+
+-------------------------------------------------------------+
|  CLIENT LAYER                                               |
|  src/components/**, src/hooks/**,                           |
|  src/features/**/components/**                              |
|  X @/server/*                                               |
|  v @/lib/*  v @/components/*  v @/hooks/*  v @/types/*      |
+-------------------------------------------------------------+
+-------------------------------------------------------------+
|  SERVER LAYER                                               |
|  src/server/**, src/features/**/actions.ts,                 |
|  src/features/**/queries.ts                                 |
|  v everything except client-only code                       |
|  MUST: "use server" (actions) or import "server-only"       |
+-------------------------------------------------------------+
+-------------------------------------------------------------+
|  FRAMEWORK-AGNOSTIC LAYER                                   |
|  src/lib/**                                                 |
|  X @/server/*  X next  X next/*  X react  X react-dom       |
+-------------------------------------------------------------+
```

**Why these boundaries.** Client bundles must never leak server secrets (auth tokens, DB creds). `lib/` must be testable in isolation without Next or React, so it can also run in build scripts, Edge runtimes, or CLI tools. `proxy.ts` runs at the Edge before React renders; importing a component would bundle React into the proxy.

---

## Routing Structure

### Route groups
Next.js route groups `(name)` do not add URL segments; they exist only to attach a `layout.tsx`.

| Group | URL prefix | Layout | Protected? |
|---|---|---|---|
| `(auth)` | `/login`, `/signup/*`, `/forgot-password`, `/reset-password`, `/verify` | `AuthShell` | No (redirects authenticated users to `/onboarding`) |
| `(marketing)` | `/`, `/about`, `/pricing`, `/contact` | `MarketingHeader` + `MarketingFooter` | No |
| `(protected)` | `/[workspace]/*`, `/onboarding` | `AppShell` (inside `[workspace]`) | Yes |
| none | `/api/*` | none | Depends on handler |
| none | `/design/*` | `DesignLayout` | **Dev-only** (gated by `DESIGN_PREVIEW_ENABLED`) |

### Multi-tenancy via `[workspace]`
Workspace-scoped routes live under `src/app/(protected)/[workspace]/*`. The `[workspace]` dynamic segment is the tenant slug; users see URLs like `/acme/dashboard`, not `/app/acme/dashboard`.

The workspace layout (`(protected)/[workspace]/layout.tsx`):
1. `await params` (Next 16: `params` is now `Promise<...>`).
2. Short-circuits to `notFound()` if the slug is in `RESERVED_SLUGS` (defined in `@/lib/validation/reserved-slugs`).
3. Wraps children in `<AppShell>`.

Reserved slugs include public top-level paths (`login`, `pricing`, `about`...), framework folders (`_next`, `api`, `design`), public asset folders (`brand`, `avatars`, `icons`, `social`), and future product routes (`admin`, `docs`, `blog`, `status`, `billing`, ...). Keep this set in sync with any route you add at the app root.

### Public vs protected
The split is enforced in `proxy.ts` (see [Proxy Configuration](#proxy-configuration)), not by the route group name. A path is public if its first segment is in the proxy's `PUBLIC_TOP_LEVEL` set; otherwise it is either a reserved slug (404) or a workspace route (auth-required).

### `/design` is dev-only
`src/app/design/*` is the design-system preview site. One-to-one preview pages exist for every component in `components/base/*` and `components/common/*`, plus token pages (`colors`, `text-styles`, `effect-styles`, `spacing-size-radius`, `variables`, `design-resources`).

Gated in `src/app/design/layout.tsx`:
- Enabled automatically when `NODE_ENV === "development"`.
- In preview/production, set `DESIGN_PREVIEW_ENABLED=true` to opt in.
- Otherwise the layout calls `notFound()`.

---

## Data Flow Patterns

### Read: Server Component -> `queries.ts` -> DB
```
page.tsx (Server Component)
  +- import { getDashboardStats } from "@/features/dashboard/queries"
       +- queries.ts has: import "server-only"
            +- supabase.from(...).select(...)
```
Reads happen on the server. No `fetch()` from the client for owned data.
Example: `src/features/dashboard/queries.ts` exports `getDashboardStats(): Promise<DashboardStats>`.

### Write: form -> Server Action -> revalidate
```
<form action={signIn}> (Client Component)
  +- signIn in features/auth/actions.ts ("use server")
       +- validate input via schemas.ts (Zod)
       +- supabase.from(...).insert(...)
       +- revalidatePath("/...") or revalidateTag("...")
       +- return { ok: true, data } | { ok: false, error }
```
Actions return `ApiResult<T>` from `@/types/api`:
```ts
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
```
Client reads the `ok` discriminator and branches. Actions do **not** throw for business errors (unauthenticated, validation fail, not found). They throw only for unexpected failures; Next will surface those via the nearest `error.tsx`.

### Validation
Input is validated inside the Server Action before any side effect. Current `features/*/schemas.ts` are placeholder `as const` objects; Zod is the intended library (not yet installed).

### Type sharing
Feature-scoped types live in `features/<name>/types.ts`. Cross-cutting types live in `src/types/`. Database row types will come from `supabase gen types typescript --local` once the schema lands.

---

## Component Hierarchy

- **`components/base/`** — primitives. Atomic, unstyled behavior containers. No dependencies on other components. Pure UI building blocks.
  *Example:* `components/base/button.tsx` — `<Button size variant radius leftIcon rightIcon>`.
- **`components/common/`** — composites. Built from `base/` primitives, add pattern-level logic (inputs with labels, searchable dropdowns, tooltips).
  *Example:* `components/common/input-address.tsx` composes several `base/` frames and inputs.
- **`components/layout/`** — page shells. Application-wide frames that wrap route segments.
  *Example:* `components/layout/app-shell.tsx` wraps workspace routes; `components/layout/auth-shell.tsx` wraps `/login`, `/signup`, etc.
- **`features/<name>/components/`** — feature-scoped. Never imported by another feature.
  *Example:* `features/billing/components/invoice-list.tsx` is imported by `app/(protected)/[workspace]/billing/page.tsx` only.
- **`components/brand/`** — brand-owned. Independent of app state; driven by `config/brand.ts`.

**Preview site.** Every `base/*` and `common/*` component has a 1:1 preview page under `src/app/design/base/<name>/page.tsx` or `src/app/design/common/<name>/page.tsx`. When you add a component, add its preview page in the same PR.

**Styling conventions.**
- Tailwind utilities for color, flex/grid, states (`hover:`, `focus-visible:`).
- Inline `style={...}` is acceptable **for design-token mapping** (sizes, paddings, radii pulled from a typed spec). See `components/base/button.tsx` for the pattern.
- Use `cn(...)` from `@/lib/cn` to join conditional classes. It is a plain joiner; it does **not** resolve conflicting Tailwind utilities, so write carefully.

---

## Proxy Configuration

`src/proxy.ts` replaces Next's old `middleware.ts`. It runs at the Edge on every matched request before React.

**What it does.**
1. Reads the session via `getSessionFromRequest(request)` from `@/server/auth/proxy-helpers` (will be wired to Supabase Auth).
2. Redirects unauthenticated users away from workspace routes and `/onboarding` -> `/login?next=<original-path>`.
3. Redirects authenticated users away from `AUTH_ROUTES` -> `/onboarding`.
4. Delegates 404 for reserved-but-non-public slugs to the workspace layout's `notFound()`.

**Key sets.**
- `AUTH_ROUTES` — `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify`. Update when adding a new unauthenticated-only route.
- `PUBLIC_TOP_LEVEL` — top-level paths that do not require auth: `""`, `pricing`, `about`, `contact`, and the auth routes. Update when adding a new public top-level page (for example a `/blog` index).
- `RESERVED_SLUGS` (from `@/lib/validation/reserved-slugs`) — anything that must not be a workspace slug.

**Matcher.** Excludes `_next/static`, `_next/image`, `favicon.ico`, `brand/`, `avatars/`, `icons/`, `social/`, `api/`, and common image extensions.

**Rules for modifying `proxy.ts`.**
- Edge runtime, so no Node-only APIs.
- No heavy computation, no DB queries. Defer everything auth-sensitive to Server Components and Server Actions.
- ESLint blocks imports from `@/components/*`, `@/hooks/*`, and `@/features/*` in this file.

---

## Naming Conventions

- **Filenames and folders:** kebab-case. `stat-card.tsx`, `input-address.tsx`, `use-current-user.ts`, `reserved-slugs.ts`.
- **Components:** PascalCase. `export function StatCard()` in `stat-card.tsx`.
- **Hooks:** `use`-prefix, camelCase. `useCurrentUser`.
- **Named exports by default.** `export function Button`, not `export default`.
- **Default exports are only for Next special files and `proxy.ts`:** `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx`. `route.ts` uses named HTTP verb exports; `proxy.ts` uses named `proxy` and `config`.
- **No barrel `index.ts` files.** Import direct from the source file.
- **Path aliases** (from `tsconfig.json`): `@/*`, `@/app/*`, `@/components/*`, `@/features/*`, `@/lib/*`, `@/server/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/styles/*`. Never use relative parent imports (`../../..`).

---

## Working on Foundry

### Add a new marketing page
1. Create `src/app/(marketing)/<slug>/page.tsx`. Default-export a Server Component.
2. If the slug is top-level (e.g. `/blog`), add it to `PUBLIC_TOP_LEVEL` in `src/proxy.ts` and to `RESERVED_SLUGS` in `src/lib/validation/reserved-slugs.ts`.
3. Add a link in `src/config/navigation.ts` if it belongs in the marketing nav.

### Add a new workspace-scoped route
1. Create `src/app/(protected)/[workspace]/<slug>/page.tsx`. Server Component by default.
2. Read params: `const { workspace } = await params`.
3. Fetch data via `features/<name>/queries.ts`, not inline.
4. If the route has async work, add `loading.tsx`. If it fetches external data, add `error.tsx`.
5. Add an entry in `buildAppNav` or `buildSettingsNav` in `src/config/navigation.ts` if it should appear in the app nav.

### Add a new feature module
```
src/features/<name>/
  components/        # feature-scoped UI
  actions.ts         # "use server"
  queries.ts         # import "server-only"
  schemas.ts         # input validation (Zod when installed)
  types.ts           # shared types
```
Never import from another feature. If you need cross-feature code, promote it to `lib/`, `server/`, or `components/common/`.

### Add a new base primitive
1. Create `src/components/base/<name>.tsx`. Named export.
2. Add a preview at `src/app/design/base/<name>/page.tsx` that exercises all props and variants.
3. Do not import from `common/` or feature code. Primitives are leaves.

### Add a new composite
1. Create `src/components/common/<name>.tsx`. Named export.
2. Compose from `base/*` only (no feature imports).
3. Add a preview at `src/app/design/common/<name>/page.tsx`.

### Modify proxy behavior
Files to touch: `src/proxy.ts`, `src/server/auth/proxy-helpers.ts`, `src/lib/validation/reserved-slugs.ts`.
Checklist:
- Updated `AUTH_ROUTES` / `PUBLIC_TOP_LEVEL` / `RESERVED_SLUGS` as needed.
- Verified the new path against the `config.matcher` regex.
- Confirmed no new imports from `@/components/*`, `@/hooks/*`, `@/features/*` (ESLint will block).
- Verified Edge compatibility. No Node-only APIs.

### Rename or move a file
Use `git mv` to preserve history. Then search for `@/<old-path>` imports across the repo. Never leave re-export shims; update imports directly.

### Add a schema change (once Supabase is wired)
1. Iterate locally with `execute_sql` via the Supabase MCP, or `supabase db query` via CLI. Do **not** use `apply_migration` on every change; that locks the migration history before you are ready.
2. Run `supabase db advisors` and fix security or performance warnings.
3. Commit with `supabase db pull <name> --local --yes` to generate the migration file.
4. Regenerate TS types: `supabase gen types typescript --local > src/types/database.ts`.

---

## Scripts

Defined in `package.json`:
- `pnpm dev` — `next dev` (Turbopack by default in Next 16).
- `pnpm build` — `next build`.
- `pnpm start` — `next start`.
- `pnpm lint` — `eslint`.
- `pnpm typecheck` — `tsc --noEmit`.

**Missing but planned** (install the tool first, then add the script):
- `pnpm format` / `format:check` — Prettier once installed.
- `pnpm db:*` — Supabase CLI commands (`supabase start`, `db reset`, `db pull`, `gen types`). Many of these are used directly without npm scripts.

---

## Environment

### `src/env.ts` — runtime accessor
Currently a thin wrapper:
```ts
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
```
**Swap to Zod validation as soon as the first real integration is wired.** Cast raw `process.env` only inside `env.ts`; the rest of the codebase imports typed values from `env`.

### `.env.example`
Root file with commented blocks for Supabase (auth + db + storage), Stripe (billing), Resend (email), and the `DESIGN_PREVIEW_ENABLED` flag. Copy to `.env.local` and fill in only what you have wired.

### Supabase local workflow
This project develops **against a local Supabase stack**, not against a cloud project by default.

1. `supabase init` — one-time, creates `supabase/config.toml` and `supabase/migrations/`.
2. `supabase start` — boots Postgres, Auth, Storage, Studio locally via Docker.
3. Populate `.env.local` with the local URL + publishable/secret keys that `supabase status` prints.
4. Iterate with `execute_sql` (MCP) or `supabase db query`, then `supabase db pull <name> --local --yes` to create a migration when ready.
5. Regenerate types: `supabase gen types typescript --local > src/types/database.ts`.

Cloud projects (preview, prod) are deployed separately. Never point local dev at a shared cloud project by accident.

### `config/` vs `env`
- `src/config/*` — **static, compile-time** config that is safe to commit (brand identity, feature flags, nav). Changing these requires a build.
- `src/env.ts` — **runtime** values (URLs, secrets, tokens) that vary per environment.

Do not put secrets in `config/`. Do not put product identity in `env`.

---

## Stack Decisions

Decisions made; dependencies to install in follow-up commits as each layer gets wired.

| Layer | Choice | Packages to install when wired |
|---|---|---|
| Database + Auth + Storage | **Supabase** (local-first via Supabase CLI) | `@supabase/supabase-js`, `@supabase/ssr` |
| Email | **Resend + react-email** | `resend`, `react-email`, `@react-email/components` |
| Payments | **Stripe** | `stripe` |
| Validation | **Zod** | `zod` |
| Design preview gate | **`DESIGN_PREVIEW_ENABLED` env flag** (auto-on in dev) | none |
| Testing | Not in scope for this iteration | later: `vitest` + `@playwright/test` |
| Deployment | Not yet finalised (Vercel is the implicit target given Next 16 + proxy.ts) | n/a |

When a layer gets wired:
1. `pnpm add` the packages.
2. Update `src/env.ts` to validate its variables with Zod.
3. Replace the stub in `src/server/<area>/client.ts`.
4. Add any needed scripts to `package.json`.
5. Update this table and the relevant sections above.

---

## Conventions Claude Must Follow

The detailed, machine-readable rules live in `.claude/rules.md`. The short version:

1. **Server by default.** Add `"use client"` only when you need state, effects, browser APIs, event handlers, context, or a client-only library.
2. **Respect the layers.** Client code never imports `@/server/*`. `lib/` never imports `next`, `react`, or `server/*`. `proxy.ts` never imports `components/*`, `hooks/*`, `features/*`. ESLint will block you.
3. **`"use server"`** at the top of every `features/*/actions.ts`. **`import "server-only"`** at the top of every `features/*/queries.ts` and everything under `server/`.
4. **No cross-feature imports.** If two features need the same thing, promote it.
5. **Return `ApiResult<T>` from Server Actions.** Do not throw for business errors.
6. **Validate at the Action boundary.** Never trust form data.
7. **`revalidatePath` or `revalidateTag`** after a successful mutation.
8. **Named exports** everywhere except Next special files and `proxy.ts`.
9. **kebab-case files**, PascalCase components, `use`-prefixed hooks.
10. **Use `@/` aliases.** No `../../..` imports.
11. **`cn()` is a joiner, not a merger.** Do not rely on it to dedupe conflicting Tailwind classes.
12. **Add a `design/<kind>/<name>/page.tsx` preview** for every new base/common component.
13. **Do not edit `globals.css`** for component-local styles. Tokens only.
14. **No em dashes** in user-facing copy, comments, or strings.
15. **`any` is banned.** Use `unknown` and narrow. Strict mode is on.

If a rule in `.claude/rules.md` conflicts with this document, the rules file wins for enforcement. Update both together.
