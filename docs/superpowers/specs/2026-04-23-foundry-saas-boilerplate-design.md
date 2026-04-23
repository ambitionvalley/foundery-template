# Foundry — SaaS Boilerplate Template · Design

**Date:** 2026-04-23
**Status:** Approved (design phase) — ready for implementation plan
**Working directory:** `/Users/hakansahingoz/Documents/Dev/Projects/intakely`

---

## 1. Context & goal

The current repo (`intakely`) is a fresh Next.js 16 + React 19 + Tailwind 4 project whose entire surface is a design-system showcase at `/design`: 19 base primitives (`src/components/base/*`), 23 common components (`src/components/common/*`), and ~40 documentation pages covering colors, text styles, effect styles, spacing/size/radius, variables, and per-component demos. No auth, no DB, no billing, no tests, no CI — just the design system and its docs. Branding strings ("Intakely", "SnowUI" logos/wordmarks) are scattered through `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/design/page.tsx`, and `public/figma/*`.

The goal is to turn this into **Foundry** — a reusable GitHub template repo that can be forked into every future SaaS and rebranded in minutes without losing the design system.

**Scope decisions (locked in during brainstorming):**

| Decision          | Choice                                                                                                          |
|-------------------|-----------------------------------------------------------------------------------------------------------------|
| Template scope    | Design-system + foundational shells. No SDKs pre-installed; no integrations pre-wired.                          |
| Template name     | **Foundry**                                                                                                     |
| Reuse mechanism   | GitHub Template Repo ("Use this template" → new repo → rebrand via checklist).                                  |
| Fresh-fork surface| Minimal shell: placeholder landing, unwired auth forms, dashboard skeleton, `/design` dev-only.                 |
| Integrations      | `.env.example` + README checklist only — no SDKs installed.                                                     |
| Rebrand mechanism | Single `src/config/brand.ts` + README checklist for non-DRYable items (package.json, logos).                    |
| Implementation    | Hybrid — leave `components/base` + `components/common` untouched; reorganize only the `app/` shell + config.    |

## 2. Out of scope

- Installing or wiring Supabase, Stripe, Resend, or any SDK.
- Zod-based env validation (deferred until the first integration is wired per product).
- Tests / CI / Prettier / pre-commit hooks.
- A rename script, CLI scaffolder, or monorepo structure.
- Dummy marketing content (hero, pricing, features sections) — forks replace that anyway.
- Changes to any file under `src/components/base/**` or `src/components/common/**`.

## 3. Final directory structure

```
foundry/
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  └─ page.tsx              # NEW  — minimal landing placeholder
│  │  ├─ (auth)/
│  │  │  ├─ login/page.tsx        # NEW  — unwired form
│  │  │  └─ signup/page.tsx       # NEW  — unwired form
│  │  ├─ (app)/
│  │  │  └─ app/
│  │  │     ├─ layout.tsx         # NEW  — sidebar + topbar shell
│  │  │     └─ page.tsx           # NEW  — empty card grid
│  │  ├─ design/
│  │  │  ├─ layout.tsx            # NEW  — notFound() in production
│  │  │  └─ ...                   # UNCHANGED — all existing design pages
│  │  ├─ layout.tsx               # EDIT — reads metadata/font from brand.ts
│  │  ├─ page.tsx                 # DELETE — replaced by (marketing)/page.tsx
│  │  └─ globals.css              # KEEP — tokens unchanged
│  ├─ components/
│  │  ├─ base/                    # UNCHANGED
│  │  └─ common/                  # UNCHANGED
│  ├─ config/
│  │  └─ brand.ts                 # NEW  — single source of truth for branding
│  └─ env.ts                      # NEW  — thin env accessor (no zod yet)
├─ public/
│  ├─ figma/                      # DELETE — SnowUI-specific assets
│  └─ foundry/                    # NEW  — placeholder logos (mark, wordmark, og)
├─ .env.example                   # NEW  — commented integration blocks
├─ AGENTS.md                      # KEEP
├─ CLAUDE.md                      # KEEP
├─ README.md                      # REWRITE
└─ package.json                   # EDIT — "name": "foundry"
```

Route groups `(marketing)`, `(auth)`, `(app)` are Next.js App Router features that do not add URL prefixes — they only group files for shared layouts and clarity. `(marketing)/page.tsx` is the new `/` route; the old `src/app/page.tsx` (which redirected to `/design`) is deleted because only one file may serve `/`. Only `(app)/app/` gets its own `layout.tsx` (sidebar + topbar); `(marketing)` and `(auth)` inherit the root layout directly.

## 4. `src/config/brand.ts` — branding source of truth

```ts
export const brand = {
  // Identity
  name: "Foundry",
  shortName: "Foundry",
  description: "SaaS starter template by Hakan.",
  url: "https://foundry.example.com",

  // Visuals
  logo: {
    mark: "/foundry/logo.svg",
    wordmark: "/foundry/wordmark.svg",
  },
  font: {
    sans: "Inter",
  },

  // Social / SEO
  twitter: "@foundry",
  ogImage: "/foundry/og.png",
} as const;

export type Brand = typeof brand;
```

**Consumers:**

| File                               | Fields read                                    |
|------------------------------------|------------------------------------------------|
| `src/app/layout.tsx`               | `name`, `description`, `font.sans`             |
| `src/app/(marketing)/page.tsx`     | `name`, `description`, `logo.wordmark`         |
| `src/app/design/page.tsx`          | `name` (replaces hard-coded "Intakely")        |
| `src/app/(auth)/login/page.tsx`    | `logo.mark`, `name`                            |
| `src/app/(auth)/signup/page.tsx`   | `logo.mark`, `name`                            |
| `src/app/(app)/app/layout.tsx`     | `logo.mark`, `shortName`                       |

**Not in `brand.ts` (intentional):**
- **Colors** stay in `globals.css` as CSS variables. Rebrand adjusts tokens there. Reason: "brand color" is 30+ tokens (hover, disabled, semantic, dark-mode), not a single hex.
- **Per-page copy** (button labels, form text) stays inline where it is used.

## 5. Dev-only `/design` route

A single layout guard hides the design showcase in production:

```tsx
// src/app/design/layout.tsx
import { notFound } from "next/navigation";

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <>{children}</>;
}
```

- **One check covers all 40+ design pages** via layout inheritance.
- **`notFound()` not `redirect()`** — a redirect leaks the route's existence.
- **`NODE_ENV` not a custom flag** — no extra `ENABLE_DESIGN_DOCS` to forget.
- **No middleware** — middleware runs on every request; a layout check benefits from SSG/ISR.

**Runtime semantics:** `pnpm dev` sets `NODE_ENV=development` → docs render. `pnpm build && pnpm start` sets `NODE_ENV=production` → `notFound()` triggers → docs render as 404. Vercel production and preview deploys both set `NODE_ENV=production`, so both hide the docs. If the user later wants design docs visible on preview URLs, swap the check for `process.env.VERCEL_ENV !== "production"` (captured as open question in §10).

## 6. Shells (marketing / auth / app)

All three shells compose existing `base/*` and `common/*` components — exercising the design system as a built-in smoke test.

### 6.1 `src/app/(marketing)/page.tsx` — root `/`

Minimal placeholder; pulls name/description from `brand.ts`. One visible "Replace this with your product's landing page." hint so the fork-owner can't miss it.

### 6.2 `src/app/(auth)/login/page.tsx` + `signup/page.tsx`

- Centered card (`components/common/card`) with `brand.logo.mark` + `brand.name` at the top.
- `components/common/input` for email + password (signup adds name).
- `components/base/button` primary variant as submit.
- `<form>` has an inert client-side `onSubmit` that logs a `TODO: wire auth`.
- Footer link to the other page (`Link` from `next/link`).
- **No auth provider**, **no form library**, **no validation** — pure visual scaffold.

### 6.3 `src/app/(app)/app/layout.tsx` + `page.tsx` — dashboard skeleton

Layout renders a two-column shell:

- **Sidebar (256px):** `brand.logo.mark` + `shortName` top, dummy nav items ("Dashboard", "Settings"), empty below.
- **Topbar:** page title + `common/search` placeholder + `common/notifications-anchor` + `base/image` avatar.
- **Content:** 3-card empty grid (`common/card`) with a "Replace this with your app" subtitle.
- **No auth guard, no data fetch.**

### 6.4 Principles across shells

- No state libraries, no form libraries — template is a canvas, not a commitment.
- Each page reads from `brand.ts` where applicable — demonstrates the pattern.
- No `lib/mock-users.ts` or similar dummy-data files. Inline hard-coded strings with "Replace me" comments are more honest about what has to change.

## 7. Env scaffold + integrations checklist

### 7.1 `.env.example`

```bash
# ─── App ──────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ─── Supabase (auth + db + storage) ───────────────────────────────
# https://supabase.com/dashboard → Project → Connect
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=    # sb_publishable_... (client-safe)
# SUPABASE_SECRET_KEY=                     # sb_secret_...      (server-only)

# ─── Stripe (billing) ─────────────────────────────────────────────
# https://dashboard.stripe.com/apikeys
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ─── Resend (transactional email) ─────────────────────────────────
# https://resend.com/api-keys
# RESEND_API_KEY=
```

Integration blocks are commented out. The fork-owner uncomments only what this product uses.

**Supabase key names** follow the current (2026) quickstart: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`, not the legacy `ANON_KEY` / `SERVICE_ROLE_KEY`.

### 7.2 `src/env.ts`

```ts
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
```

Intentionally thin — no zod. Switch to zod when the first integration is wired per-product (captured in the README).

## 8. README rewrite

The new `README.md` contains (in order): a one-line product description, "What's in the box" (design system, shells, branding, env scaffold), quick start (`pnpm install && pnpm dev`), **Fork-and-rebrand checklist**, **Adding integrations**, and a brief tech list.

**Rebrand checklist (in README):**

- Rename `package.json` → `"name"` to product slug.
- Update `src/config/brand.ts` — name, description, url, twitter, ogImage.
- Replace logos in `public/foundry/` (mark, wordmark, og.png). Rename folder to match slug if desired.
- Tune CSS tokens in `src/app/globals.css` — primary color, anything semantically specific.
- Rewrite `src/app/(marketing)/page.tsx` with the real landing.
- Delete the rebrand checklist from README; replace with a real product intro.

The "delete this checklist" step is explicit: the README after a rebrand must not contain Foundry-specific scaffolding copy.

## 9. Testing

Manual verification only — no test suite is added in this pass.

After implementation, run through:

1. `pnpm dev` — marketing placeholder renders at `/`, login/signup render, `/app` renders with sidebar + topbar + 3 cards.
2. `pnpm dev` — `/design`, `/design/colors`, and a handful of component showcase pages still render identically to today.
3. `pnpm build && pnpm start` — `/design` returns 404. Other routes render.
4. Change `brand.name` to "Test Product" in `brand.ts` — `<title>`, marketing placeholder, design docs heading, auth card header, and dashboard sidebar all update.
5. Grep: no remaining occurrences of `Intakely`, `intakely`, `SnowUI`, or `snowui` in source files (logos in `public/figma/` are deleted).

## 10. Risks & open questions

- **Design-page branding copy.** Some design pages may contain inline "Intakely" strings beyond just `design/page.tsx`. Implementation plan should grep exhaustively and either move strings through `brand.ts` or genericize them.
- **`SnowUILogo` component inside `src/app/design/page.tsx`.** It renders `/figma/snowui-logo.svg` + `/figma/snowui-wordmark-*.svg`. Those files are deleted, which breaks the design index at build time. Implementation plan must replace the inline `SnowUILogo` with a generic component that reads `brand.logo.wordmark` (or `brand.logo.mark` + `brand.name` as a fallback).
- **Preview deploys on Vercel.** If the user wants design docs visible on preview URLs (for design review), swap the `NODE_ENV` check for `process.env.VERCEL_ENV !== "production"`. Default stays `NODE_ENV` — simpler and framework-agnostic.
- **Placeholder logos.** Foundry needs its own mark/wordmark/og.png. Implementation plan should either generate simple SVG placeholders or flag this as a follow-up asset task.
- **`public/figma/` avatars.** Avatar PNGs (`avatar-*.png`, `byewind-avatar.png`) are used inside design showcase pages. Keep them — they are demo assets, not brand assets. Only SnowUI logo/wordmark SVGs get removed.
