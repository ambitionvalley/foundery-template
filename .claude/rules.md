# Foundry — Claude Rules

**Scope:** AI assistants (Claude Code / Desktop / Web) and human contributors working in `src/`. These rules are enforced by ESLint where marked; the rest are conventions Claude MUST respect.

Last reviewed: keep in sync with `CLAUDE.md`. If rules here conflict with `CLAUDE.md`, this file wins for enforcement; update both together.

---

## Import Boundaries (ESLint-enforced)

- NEVER import `@/server/*` from `src/components/**`, `src/hooks/**`, or `src/features/**/components/**`.
- NEVER import `@/server/*`, `next`, `next/*`, `react`, or `react-dom` from `src/lib/**`.
- NEVER import `@/components/*`, `@/hooks/*`, or `@/features/*` from `src/proxy.ts`.
- ALWAYS use `@/` path aliases (`@/components/*`, `@/features/*`, `@/lib/*`, `@/server/*`, `@/hooks/*`, `@/types/*`, `@/config/*`, `@/styles/*`, `@/app/*`).
- NEVER use relative parent imports (`../`, `../../`, `../../..`). Relative imports are only allowed for same-folder siblings if at all.
- NEVER import one feature module from another (`features/billing` MUST NOT import `features/auth`). Promote shared code to `lib/`, `server/`, or `components/common/`.

## File System Rules

- ALWAYS kebab-case for files and folders (`stat-card.tsx`, `use-current-user.ts`, `reserved-slugs.ts`).
- ALWAYS PascalCase for component names and TypeScript types (`StatCard`, `ApiResult`).
- ALWAYS camelCase for variables, functions, and hooks. Hooks MUST start with `use` (`useDebounce`).
- ALWAYS named exports for components, utilities, hooks, types, and server functions.
- ONLY use `export default` for: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `global-error.tsx`, `template.tsx`. `route.ts` and `proxy.ts` use named exports (`GET`, `POST`, `proxy`, `config`).
- NEVER create `index.ts` barrel re-exports. Import directly from the source file.
- ALWAYS place base primitives in `src/components/base/`.
- ALWAYS place composites in `src/components/common/`.
- ALWAYS place page shells in `src/components/layout/`.
- ALWAYS place feature-scoped components in `src/features/<name>/components/`.
- ALWAYS use `git mv` when renaming or moving files to preserve history.

## Server / Client Rules

- ALWAYS Server Component by default. DO NOT add `"use client"` unless the component uses `useState`, `useEffect`, `useReducer`, `useContext`, event handlers, browser APIs, refs to DOM nodes, or a client-only library.
- ALWAYS `"use server"` as the first line of every `src/features/*/actions.ts`.
- ALWAYS `import "server-only"` as the first line of every `src/features/*/queries.ts` and every file under `src/server/**`.
- NEVER import a Server Action from a Server Component. Call the underlying function directly (or call the query instead).
- NEVER `fetch("/api/...")` from a Server Component to call your own app. Import and call the server function.
- NEVER expose `process.env.*` outside `src/env.ts`. Import typed values from `@/env` instead.

## Feature Module Rules

- ALWAYS structure a feature as `features/<name>/{components/, actions.ts, queries.ts, schemas.ts, types.ts}`. Omit folders/files that do not apply yet (e.g. `workspaces/` has no `components/`), but do not invent new top-level names.
- NEVER import another feature (`features/billing` MUST NOT reach into `features/auth`).
- IF shared logic appears in two features: extract to `@/lib/*` (pure), `@/server/*` (DB / side effects), or `@/components/common/*` (UI).
- ALWAYS keep `components/` inside a feature client-focused; server data enters via props from the parent Server Component or via a Server Action call.

## Data Rules

- ALWAYS fetch data in Server Components or in `queries.ts` functions.
- ALWAYS mutate via Server Actions defined in `actions.ts`.
- NEVER call the database from client components.
- ALWAYS validate input inside the Server Action before any side effect. Use `schemas.ts` (Zod once installed).
- ALWAYS return `ApiResult<T>` (from `@/types/api`) from Server Actions. Do NOT throw for business errors (validation, unauthenticated, not found). Throw ONLY for unexpected failures.
- ALWAYS call `revalidatePath(...)` or `revalidateTag(...)` after a successful mutation that changes cached data.
- ALWAYS read `params` with `await`: `const { workspace } = await params`. Params are `Promise<...>` in Next 16.

## Proxy Rules

- NEVER add DB queries, heavy computation, or external HTTP calls inside `src/proxy.ts`.
- ALWAYS keep `proxy.ts` Edge-compatible. NO Node-only APIs (`fs`, `child_process`, Node-only `crypto` builds).
- IF adding a new auth-only route: update `AUTH_ROUTES` in `src/proxy.ts`.
- IF adding a new public top-level route: update `PUBLIC_TOP_LEVEL` in `src/proxy.ts` AND add it to `RESERVED_SLUGS` in `src/lib/validation/reserved-slugs.ts`.
- IF adding a new reserved product slug: update `RESERVED_SLUGS` only.
- ALWAYS verify the path is covered by the `config.matcher` regex.

## Multi-tenancy Rules

- ALWAYS place workspace-scoped pages under `src/app/(protected)/[workspace]/`.
- ALWAYS extract the workspace slug via `await params`, never from the URL string.
- NEVER hardcode workspace routes as `/app/*`. The tenant slug is the first segment.
- ALWAYS check `RESERVED_SLUGS` before trusting a slug as tenant-like (the workspace layout already does this via `notFound()`).
- ALWAYS use `buildAppNav(workspace)` / `buildSettingsNav(workspace)` from `@/config/navigation` to build workspace-scoped URLs; do not concatenate strings by hand.

## Design System Rules

- ALWAYS add a preview page at `src/app/design/base/<name>/page.tsx` or `src/app/design/common/<name>/page.tsx` when you add a base or common component.
- NEVER import feature code from `components/base/*` or `components/common/*`.
- `components/base/*` MUST NOT import from `components/common/*`. Primitives are leaves.
- `components/common/*` MAY import from `components/base/*`. MUST NOT import from `components/layout/*` or `components/brand/*`.

## Styling Rules

- ALWAYS use Tailwind utility classes for color, spacing, flex/grid, and state (`hover:`, `focus-visible:`, `active:`, `disabled:`).
- Inline `style={...}` IS ALLOWED for design-token mapping (sizes, paddings, radii pulled from a typed spec). See `components/base/button.tsx`. Do NOT use inline style for colors or one-off tweaks.
- ALWAYS use `cn(...)` from `@/lib/cn` to join conditional classes. `cn` is a plain joiner and does NOT resolve conflicting Tailwind utilities; write classes so they do not conflict.
- NEVER edit `src/app/globals.css` for component-local styles. Only edit for tokens and base layers.
- ALWAYS reference brand values via `@/config/brand`, never hardcode product name, URL, or logo paths.

## TypeScript Rules

- `strict` mode is on. Do NOT relax `tsconfig.json`.
- NEVER use `any`. Use `unknown` and narrow with type guards.
- ALWAYS use `import type { ... }` for type-only imports.
- ALWAYS export types next to the implementation or in the feature's `types.ts`.
- NEVER use non-null assertion (`!`) on values coming from user input, env, or the DB. Narrow explicitly.
- ALWAYS prefer `readonly` and `as const` for static data.

## Error Handling Rules

- ALWAYS add `error.tsx` to any route segment that performs async data fetching.
- ALWAYS add `loading.tsx` to any route segment that awaits slow work (`fetch`, DB).
- ALWAYS add `not-found.tsx` where `notFound()` is called in a segment-local layout.
- NEVER swallow errors silently. Log them via the server logger or rethrow.
- ALWAYS return `{ ok: false, error }` from Server Actions for expected failures so the client can render a message without crossing an error boundary.

## Configuration Rules

- ALWAYS put static, commit-safe values in `src/config/*.ts`.
- ALWAYS put runtime/secret values behind `src/env.ts`. Nothing else reads `process.env` directly.
- IF you install a new integration: add its env keys to `.env.example`, add a validator block in `env.ts`, update `CLAUDE.md` "Stack Decisions".

## Supabase Rules

- ALWAYS develop against a local Supabase stack (`supabase start`), not a shared cloud project.
- NEVER use `user_metadata` (`raw_user_meta_data`) for authorization decisions. It is user-editable. Use `app_metadata` instead.
- ALWAYS enable RLS on every table in the `public` schema. Policies must match the actual access model; do not default every table to the same `auth.uid()` check.
- ALWAYS use `CREATE VIEW ... WITH (security_invoker = true)` on Postgres 15+. Views bypass RLS by default otherwise.
- REMEMBER: an UPDATE policy requires a SELECT policy too. Missing SELECT silently updates zero rows.
- NEVER expose the `service_role` / secret key in any `NEXT_PUBLIC_*` variable or client bundle. Use publishable keys for browser code.
- ALWAYS use `execute_sql` (MCP) or `supabase db query` while iterating on schema. Only run `supabase db pull --local --yes` to commit.
- ALWAYS regenerate `src/types/database.ts` via `supabase gen types typescript --local` after schema changes.
- ALWAYS run `supabase db advisors` (or MCP `get_advisors`) before committing a migration.

## Writing Style Rules

- NEVER use em dashes in code comments, string literals, or user-facing copy.
- NEVER leave TODO-without-owner comments. Either fix it, open an issue, or delete.
- PREFER clear variable names over comments. Write a comment only when it explains a non-obvious WHY.
- NEVER write comments that describe WHAT the code does.

## Change Management Rules

- BEFORE moving a file: `git mv` the file AND update every `@/<old-path>` import in one commit.
- BEFORE renaming a component or exported symbol: grep the repo for usages and update them together.
- BEFORE deleting a feature module: grep for cross-references in `src/app/**` and other features.
- BEFORE modifying `proxy.ts`: re-read the "Proxy Rules" section and run `pnpm lint`.
- BEFORE claiming work is done: run `pnpm lint` and `pnpm typecheck`.
- NEVER commit changes with `--no-verify`.

## Dependency Rules

- ALWAYS install dependencies with `pnpm add`. Do not hand-edit `package.json` unless versioning a monorepo workspace.
- NEVER install a runtime dependency into `devDependencies` or vice versa.
- BEFORE adding a heavy dependency: check whether `lib/` or an existing utility already covers the need.

## Meta

- IF a rule here is wrong or blocks the task: stop, explain to the user, propose updating this file. Do NOT silently violate.
- IF `CLAUDE.md` and this file disagree on a factual detail (e.g. which folder something lives in): follow the code, then fix whichever doc is wrong.
