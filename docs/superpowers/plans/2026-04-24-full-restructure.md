# Foundry — Volledige Herstructurering (Next.js 16)

> Supersedes: `2026-04-23-foundry-saas-boilerplate.md`. Dat plan was een kleinere branding-only pass; dit plan reorganiseert de hele src/ tree en public/ tree volgens moderne App Router conventies.

**Doel:** Next.js 16 production-grade layout: proxy.ts ipv middleware.ts, `features/` modules, `server/` isolatie, gesplitste `components/` (base/common/layout/brand), reference-ready `lib/` + `hooks/` + `types/` + `config/`, en opgeruimde `public/` tree.

**Uitgangspunten:**
- Git history behouden via `git mv`.
- Geen em dashes.
- Uncommitted wijzigingen in `app-right-panel.tsx`, `app-shell.tsx`, `app-sidebar.tsx`, `app-topbar.tsx`, `globals.css` blijven behouden — `git mv` werkt op tracked files ongeacht dirty state; de working-copy wijzigingen reizen mee.
- Files in `components/base/**` en `components/common/**` blijven op dezelfde locatie (target spec plaatst ze daar ook). Ze worden dus `keep`, niet onaangeroerd in inhoud noodzakelijk.

---

## LEES EERST: Beslispunten (Sectie 9 komt eerst)

Onderstaande beslissingen beïnvloeden bijna elke andere sectie. Ik heb een **default aanname** per punt opgeschreven. Loop deze even door en corrigeer voor ik de shell scripts uitvoer.

| # | Beslispunt | Default aanname | Alternatief |
|---|-----------|-----------------|-------------|
| D1 | Multi-step signup (`signup/country`, `signup/name`, `signup/password`) | **Keep** als extra sub-routes; spec toont alleen `signup/page.tsx` maar de multi-step flow is al geimplementeerd | Collapse naar 1 page |
| D2 | Password reset route | **Rename** `(auth)/forgot-password/reset` → `(auth)/reset-password` om spec te volgen | Keep als nested route |
| D3 | `brand-logo.tsx` splitsen | **Keep single file**, alleen verplaatsen naar `components/brand/brand-logo.tsx`. Pas splitsen in `brand-logo/brand-wordmark/brand-icon` wanneer divergentie nodig is | Splitsen in 3 files per spec |
| D4 | Features folder vs `components/app/[feature]` | **Features folder** (spec) | components/app/dashboard/ |
| D5 | Server actions locatie | **Co-located in `features/<x>/actions.ts`**; server-only primitives (db client, email client) in `server/` | Alles in `server/actions/` |
| D6 | Barrel exports (`index.ts`) | **Nee**, geen index.ts files | Per-folder barrels |
| D7 | Auth provider | **Agnostisch** — `server/auth/` staat klaar maar leeg, README geeft integratie-recept. Geen vendor lock-in nu | Kies nu: Supabase / Clerk / Better-Auth |
| D8 | Database ORM | **Agnostisch** — `server/db/` staat klaar maar leeg | Kies nu: Drizzle / Prisma |
| D9 | Proxy scope | **Alleen auth-route bescherming** en eenvoudige redirects. Rate limiting / i18n / feature flags later | Direct uitbreiden |
| D10 | Placeholder files creëren voor toekomst | **Ja**, creëer lege pages voor `pricing`, `about`, `contact`, `billing`, `settings/profile`, etc. met "Replace with your page" stub — maakt router volledig en template-ready | Niet aanmaken tot behoefte |
| D11 | `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg` | **Delete** `next.svg` en `vercel.svg` (Next.js scaffold artefacten). Move `file/globe/window.svg` → `public/icons/` per spec | Allemaal verwijderen |
| D12 | `public/figma/` avatars | **Move** plat naar `public/avatars/`; dedup `byewind-avatar.png` (duplicate van `avatars/byewind.png`) | Keep `public/figma/` naam |
| D13 | `public/foundry/` rename | **Rename** naar `public/brand/` per spec; update `src/config/brand.ts` | Keep `foundry/` |
| D14 | Design `components/page.tsx` overlap | **Rename** naar `design/component-index/page.tsx` om confusion met `src/components/` te voorkomen | Keep naam |

**Beslispunten die NIET in sectie 9 staan maar wel in het plan:**
- `marketing-and-seo.tsx` is een dashboard widget → gaat naar `features/dashboard/components/`, blijft NIET marketing-feature. Spec toont de naam in `features/dashboard/` dus dit klopt.
- `search.tsx`/`tap.tsx`/`mask.tsx` blijven `common/` — het zijn UI primitives, geen app-wide features.

---

## 1. Complete File Mapping Tabel

Legend: `move` (git mv), `rename` (git mv met andere naam), `delete` (git rm), `keep` (blijft), `create` (nieuw, zie sectie 2), `modify` (keep pad, contract update).

### src/app/

| Huidige pad | Nieuwe pad | Actie | Reden |
|---|---|---|---|
| src/app/layout.tsx | src/app/layout.tsx | keep | Root layout; inhoud ongewijzigd |
| src/app/globals.css | src/app/globals.css | keep | Tokens blijven centraal (uncommitted changes blijven) |
| src/app/favicon.ico | src/app/favicon.ico | keep | Per spec |
| src/app/(marketing)/page.tsx | src/app/(marketing)/page.tsx | keep | Landing page blijft |
| — | src/app/(marketing)/layout.tsx | create | Marketing header + footer wrapper |
| — | src/app/(marketing)/pricing/page.tsx | create | Placeholder — D10 |
| — | src/app/(marketing)/about/page.tsx | create | Placeholder — D10 |
| — | src/app/(marketing)/contact/page.tsx | create | Placeholder — D10 |
| src/app/(auth)/layout.tsx | src/app/(auth)/layout.tsx | keep | Auth shell (consumeert `AuthShell` na 3.) |
| src/app/(auth)/login/page.tsx | src/app/(auth)/login/page.tsx | keep | Server page die `LoginForm` rendert |
| src/app/(auth)/signup/page.tsx | src/app/(auth)/signup/page.tsx | keep | idem `SignupForm` |
| src/app/(auth)/signup/country/page.tsx | src/app/(auth)/signup/country/page.tsx | keep | D1 default=keep |
| src/app/(auth)/signup/name/page.tsx | src/app/(auth)/signup/name/page.tsx | keep | D1 |
| src/app/(auth)/signup/password/page.tsx | src/app/(auth)/signup/password/page.tsx | keep | D1 |
| src/app/(auth)/forgot-password/page.tsx | src/app/(auth)/forgot-password/page.tsx | keep | |
| src/app/(auth)/forgot-password/reset/page.tsx | src/app/(auth)/reset-password/page.tsx | rename | D2 default=rename per spec |
| src/app/(auth)/verify/page.tsx | src/app/(auth)/verify/page.tsx | keep | |
| src/app/(app)/app/layout.tsx | src/app/(app)/app/layout.tsx | keep | Consumeert verplaatste `AppShell` |
| src/app/(app)/app/page.tsx | src/app/(app)/app/page.tsx | modify | Imports worden geupdatet (5. import script) |
| — | src/app/(app)/app/loading.tsx | create | Streaming boundary |
| — | src/app/(app)/app/error.tsx | create | Error boundary |
| — | src/app/(app)/app/analytics/page.tsx | create | D10 |
| — | src/app/(app)/app/customers/page.tsx | create | D10 |
| — | src/app/(app)/app/billing/page.tsx | create | D10 |
| — | src/app/(app)/app/billing/invoices/page.tsx | create | D10 |
| — | src/app/(app)/app/settings/page.tsx | create | D10 |
| — | src/app/(app)/app/settings/profile/page.tsx | create | D10 |
| — | src/app/(app)/app/settings/team/page.tsx | create | D10 |
| — | src/app/(app)/app/settings/api-keys/page.tsx | create | D10 |
| — | src/app/(app)/app/notifications/page.tsx | create | D10 |
| — | src/app/api/webhooks/stripe/route.ts | create | Stub route handler |
| — | src/app/api/health/route.ts | create | Healthcheck |
| — | src/app/not-found.tsx | create | Global 404 |
| — | src/app/error.tsx | create | Global error boundary |
| — | src/app/global-error.tsx | create | Fatal fallback |
| — | src/app/loading.tsx | create | Root streaming boundary |
| src/app/design/* (46 files) | src/app/design/* | keep | Design-only pages, geen beweging. Spec bevestigt structuur |

### src/components/

| Huidige pad | Nieuwe pad | Actie | Reden |
|---|---|---|---|
| src/components/app/app-right-panel.tsx | src/components/layout/app-right-panel.tsx | move | App shell, niet dashboard-specifiek |
| src/components/app/app-shell.tsx | src/components/layout/app-shell.tsx | move | Shell |
| src/components/app/app-sidebar.tsx | src/components/layout/app-sidebar.tsx | move | Shell |
| src/components/app/app-topbar.tsx | src/components/layout/app-topbar.tsx | move | Shell |
| — | src/components/layout/auth-shell.tsx | create | Centraliseert auth-card wrapper |
| — | src/components/layout/marketing-header.tsx | create | Marketing nav |
| — | src/components/layout/marketing-footer.tsx | create | Marketing footer |
| src/components/app/stat-card.tsx | src/features/dashboard/components/stat-card.tsx | move | Dashboard widget |
| src/components/app/total-users-chart.tsx | src/features/dashboard/components/total-users-chart.tsx | move | Dashboard widget |
| src/components/app/traffic-by-device.tsx | src/features/dashboard/components/traffic-by-device.tsx | move | Dashboard widget |
| src/components/app/traffic-by-location.tsx | src/features/dashboard/components/traffic-by-location.tsx | move | Dashboard widget |
| src/components/app/traffic-by-website.tsx | src/features/dashboard/components/traffic-by-website.tsx | move | Dashboard widget |
| src/components/app/marketing-and-seo.tsx | src/features/dashboard/components/marketing-and-seo.tsx | move | Dashboard widget met marketing-KPI's — naam is misleidend; blijft in dashboard zoals spec aangeeft |
| src/components/app/ (dir) | — | delete | Leeg na moves |
| src/components/brand-logo.tsx | src/components/brand/brand-logo.tsx | move | D3 default=keep single file |
| — | src/components/brand/brand-wordmark.tsx | create (optional, D3) | Alleen maken wanneer D3=split |
| — | src/components/brand/brand-icon.tsx | create (optional, D3) | idem |
| src/components/base/*.tsx (19 files) | src/components/base/*.tsx | keep | Target plaatst ze daar ook |
| src/components/common/*.tsx (23 files) | src/components/common/*.tsx | keep | idem |
| — | src/components/common/tooltip-anchor.tsx | keep | Al aanwezig, blijft |
| — | src/components/common/notifications-anchor.tsx | keep | idem |

### src/ root

| Huidige pad | Nieuwe pad | Actie | Reden |
|---|---|---|---|
| src/config/brand.ts | src/config/brand.ts | modify | Update `logo.mark`/`logo.wordmark` paths na public rename D13: `/brand/logo.svg` ipv `/foundry/logo.svg` |
| — | src/config/navigation.ts | create | App nav items |
| — | src/config/features.ts | create | Feature flags |
| — | src/config/site.ts | create | Site-level constants (canonical url, locales) |
| src/env.ts | src/env.ts | keep | Al compliant |
| — | src/proxy.ts | create | Next.js 16 proxy (spec) |
| — | src/lib/utils.ts | create | Generieke utils |
| — | src/lib/cn.ts | create | Tailwind `cn` helper |
| — | src/lib/constants.ts | create | App-wide consts |
| — | src/lib/format/currency.ts | create | |
| — | src/lib/format/date.ts | create | |
| — | src/lib/format/number.ts | create | |
| — | src/lib/validation/schemas.ts | create | Gedeelde schemas (leeg stub) |
| — | src/server/db/client.ts | create | DB client placeholder — D8 |
| — | src/server/db/schema.ts | create | Schema placeholder |
| — | src/server/db/queries/.gitkeep | create | |
| — | src/server/auth/session.ts | create | Session util — D7 |
| — | src/server/auth/providers.ts | create | Provider config — D7 |
| — | src/server/auth/proxy-helpers.ts | create | Helpers voor proxy.ts |
| — | src/server/email/client.ts | create | Resend placeholder |
| — | src/server/email/templates/.gitkeep | create | |
| — | src/server/stripe/client.ts | create | Stripe placeholder |
| — | src/hooks/use-current-user.ts | create | |
| — | src/hooks/use-debounce.ts | create | |
| — | src/hooks/use-media-query.ts | create | |
| — | src/hooks/use-local-storage.ts | create | |
| — | src/types/api.ts | create | |
| — | src/types/database.ts | create | |
| — | src/types/common.ts | create | |
| — | src/styles/fonts.ts | create | `next/font` loader geëxtracteerd uit `app/layout.tsx` |
| — | src/features/dashboard/queries.ts | create | |
| — | src/features/dashboard/actions.ts | create | |
| — | src/features/dashboard/types.ts | create | |
| — | src/features/auth/components/login-form.tsx | create | Extracted uit `(auth)/login/page.tsx` |
| — | src/features/auth/components/signup-form.tsx | create | idem |
| — | src/features/auth/components/forgot-password-form.tsx | create | |
| — | src/features/auth/components/verify-form.tsx | create | |
| — | src/features/auth/components/social-buttons.tsx | create | Apple/Google/Microsoft SSO knoppen (social icons bestaan) |
| — | src/features/auth/actions.ts | create | Server actions |
| — | src/features/auth/schemas.ts | create | Zod schemas (leeg stub) |
| — | src/features/auth/types.ts | create | |
| — | src/features/billing/components/pricing-table.tsx | create | |
| — | src/features/billing/components/invoice-list.tsx | create | |
| — | src/features/billing/components/subscription-card.tsx | create | |
| — | src/features/billing/components/payment-method.tsx | create | |
| — | src/features/billing/queries.ts | create | |
| — | src/features/billing/actions.ts | create | |
| — | src/features/billing/types.ts | create | |
| — | src/features/settings/components/profile-form.tsx | create | |
| — | src/features/settings/components/team-members.tsx | create | |
| — | src/features/settings/components/api-key-list.tsx | create | |
| — | src/features/settings/queries.ts | create | |
| — | src/features/settings/actions.ts | create | |
| — | src/features/settings/types.ts | create | |
| — | src/features/marketing/components/hero.tsx | create | |
| — | src/features/marketing/components/features-grid.tsx | create | |
| — | src/features/marketing/components/testimonials.tsx | create | |
| — | src/features/marketing/components/cta-section.tsx | create | |
| — | src/features/marketing/components/faq.tsx | create | |
| — | src/features/marketing/content.ts | create | Copy constants |

### public/

| Huidige pad | Nieuwe pad | Actie | Reden |
|---|---|---|---|
| public/foundry/logo.svg | public/brand/logo.svg | move | D13 |
| public/foundry/wordmark.svg | public/brand/wordmark.svg | move | D13 |
| public/foundry/og.svg | public/brand/og.svg | move | D13 |
| — | public/brand/favicon.ico | copy | spec toont favicon in brand/; kopie van src/app/favicon.ico |
| public/figma/avatars/andi-lane.png | public/avatars/andi-lane.png | move | D12 |
| public/figma/avatars/byewind.png | public/avatars/byewind.png | move | D12 |
| public/figma/avatars/drew-cano.png | public/avatars/drew-cano.png | move | D12 |
| public/figma/avatars/natali-craig.png | public/avatars/natali-craig.png | move | D12 |
| public/figma/avatars/orlando-diggs.png | public/avatars/orlando-diggs.png | move | D12 |
| public/figma/avatar-3d-03.png | public/avatars/avatar-3d-03.png | move | D12 |
| public/figma/avatar-abstract-03.png | public/avatars/avatar-abstract-03.png | move | D12 |
| public/figma/avatar-abstract-04.png | public/avatars/avatar-abstract-04.png | move | D12 |
| public/figma/avatar-female-03.png | public/avatars/avatar-female-03.png | move | D12 |
| public/figma/avatar-male-02.png | public/avatars/avatar-male-02.png | move | D12 |
| public/figma/byewind-avatar.png | — | delete | Duplicaat van `avatars/byewind.png` — D12 |
| public/figma/ (dir) | — | delete | Leeg na moves |
| public/social/apple.svg | public/social/apple.svg | keep | Spec bevestigt `public/social/` |
| public/social/google.svg | public/social/google.svg | keep | |
| public/social/microsoft.svg | public/social/microsoft.svg | keep | |
| public/file.svg | public/icons/file.svg | move | Spec plaatst deze in icons/ |
| public/globe.svg | public/icons/globe.svg | move | idem |
| public/window.svg | public/icons/window.svg | move | idem |
| public/next.svg | — | delete | D11 — scaffold artefact |
| public/vercel.svg | — | delete | D11 — scaffold artefact |

### Root-level bestanden

| Huidige pad | Actie | Reden |
|---|---|---|
| AGENTS.md, CLAUDE.md | keep | Project instructies |
| README.md | modify | Update paden (D13) en env-variabelen |
| eslint.config.mjs | modify | Sectie 7 regels |
| next.config.ts | modify | Geen wijziging vereist, maar optioneel `typedRoutes` toevoegen |
| package.json | keep | Naam is al `foundry` |
| pnpm-lock.yaml | keep | |
| pnpm-workspace.yaml | keep | |
| postcss.config.mjs | keep | |
| tsconfig.json | modify | Sectie 6 aliases |
| structure.txt | delete | Oud artefact, niet tracked |
| next-env.d.ts | keep | Auto-generated |

---

## 2. Nieuwe Files te Maken

Zie tabel in sectie 1 voor de volledige lijst. Korte beschrijvingen per groep:

### Route handlers & boundaries (app/)
- `src/app/not-found.tsx` — globale 404 met link naar `/`.
- `src/app/error.tsx` — client error boundary (`"use client"`).
- `src/app/global-error.tsx` — fatal boundary, replaces html/body.
- `src/app/loading.tsx` — root streaming skeleton.
- `src/app/(app)/app/loading.tsx` — dashboard streaming skeleton.
- `src/app/(app)/app/error.tsx` — dashboard error boundary.
- `src/app/api/health/route.ts` — GET → `{ status: "ok", timestamp }`.
- `src/app/api/webhooks/stripe/route.ts` — POST stub; returns 501 tot Stripe is wired.

### Placeholder pages (app/, per D10)
Elk bestand is ~20 regels: H1 met routenaam, "Replace with your X page" hint.
- Marketing: `pricing`, `about`, `contact`
- Dashboard: `analytics`, `customers`, `billing`, `billing/invoices`, `settings`, `settings/profile`, `settings/team`, `settings/api-keys`, `notifications`

### proxy.ts (Next.js 16)
Template:

```ts
// src/proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/server/auth/proxy-helpers";

const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify"];
const PROTECTED_PREFIXES = ["/app"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionFromRequest(request);

  if (PROTECTED_PREFIXES.some((p) => pathname.startsWith(p)) && !session) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (AUTH_ROUTES.includes(pathname) && session) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|avatars/|icons/|social/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

Belangrijk: `getSessionFromRequest` in `server/auth/proxy-helpers.ts` returnt voorlopig `null` (agnostisch per D7) — proxy is operationeel zonder auth provider, blokkeert dan `/app` tot session bestaat.

### components/brand/brand-logo.tsx
Verplaatste versie van `src/components/brand-logo.tsx`. Pad-update: `src={brand.logo.mark}` blijft werken omdat we in sectie 1 `brand.ts` updaten naar `/brand/logo.svg`.

### components/layout/auth-shell.tsx
Centraliseert de `<main className="min-h-screen grid place-items-center ...">` wrapper + `<BrandLogo variant="mark" priority />` + `<h1>` block die nu in elke auth page dupliceert.

### components/layout/marketing-header.tsx, marketing-footer.tsx
Nav met links naar `pricing`, `about`, `contact`; footer met brand wordmark + social.

### lib/cn.ts
```ts
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
```
(Geen `clsx` of `tailwind-merge` dependency; simpel houden tot behoefte.)

### lib/format/{currency,date,number}.ts
`Intl.NumberFormat` / `Intl.DateTimeFormat` wrappers.

### lib/validation/schemas.ts
Leeg bestand met `export {};` — spec-only placeholder.

### server/auth/proxy-helpers.ts
```ts
import "server-only";
import type { NextRequest } from "next/server";

export async function getSessionFromRequest(_request: NextRequest): Promise<null> {
  return null; // TODO: wire auth provider (D7)
}
```

### server/auth/session.ts
```ts
import "server-only";
import { cookies } from "next/headers";

export async function getSession() {
  const _store = await cookies();
  return null; // TODO: wire auth provider (D7)
}
```

### server/auth/providers.ts, server/db/client.ts, server/email/client.ts, server/stripe/client.ts
Allemaal stubs met `import "server-only"` en een TODO-comment.

### features/auth/components/login-form.tsx, signup-form.tsx, etc.
Geëxtraheerd uit de huidige `(auth)/*/page.tsx` files. Page.tsx wordt een thin wrapper die de form rendert:

```tsx
// src/app/(auth)/login/page.tsx
import { LoginForm } from "@/features/auth/components/login-form";
export default function LoginPage() { return <LoginForm />; }
```

### features/auth/social-buttons.tsx
Rendert 3 knoppen met iconen uit `public/social/`. Client component (onClick handlers).

### features/auth/actions.ts
```ts
"use server";
// TODO: wire provider. Stubs voor signIn/signUp/signOut/resetPassword/verify.
```

### features/auth/schemas.ts
```ts
// Placeholder. Zod komt wanneer eerste provider wordt gewired.
export const loginSchema = { email: "", password: "" };
```

### features/*/queries.ts, actions.ts, types.ts
Per feature: leeg bestand met `export {};` als placeholder — voorkomt empty-file TS errors.

### features/marketing/content.ts
Constants voor hero copy, testimonials array, faq array.

### hooks/*.ts
Vier standaard hooks met minimaal skelet. `use-current-user.ts` returnt `null` tot D7.

### types/*.ts
Elk bestand `export type {};` placeholder.

### config/navigation.ts
```ts
export const appNav = [
  { label: "Overview", href: "/app", icon: "grid" },
  { label: "Analytics", href: "/app/analytics", icon: "chart-bar" },
  { label: "Customers", href: "/app/customers", icon: "users" },
  { label: "Billing", href: "/app/billing", icon: "credit-card" },
  { label: "Settings", href: "/app/settings", icon: "gear" },
] as const;
```

### config/features.ts
```ts
export const features = {
  billing: false,
  analytics: false,
  apiKeys: false,
} as const;
```

### config/site.ts
```ts
import { brand } from "./brand";
export const site = {
  url: brand.url,
  locales: ["en"] as const,
  defaultLocale: "en" as const,
};
```

### styles/fonts.ts
```ts
import { Inter } from "next/font/google";
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
```
`app/layout.tsx` importeert dit nu.

### .env.example (root)
Al beschreven in de oude plan file; inhoud blijft gelijk.

---

## 3. Complete Shell Migratie Script

**Voer uit vanuit repo root.** Script is idempotent: `mkdir -p` + `git mv` faalt gracefully als target bestaat.

```bash
#!/usr/bin/env bash
# docs/superpowers/scripts/foundry-restructure-move.sh
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "==> 1. Guard: clean working tree except known dirty files"
KNOWN_DIRTY="src/app/globals.css src/components/app/app-right-panel.tsx src/components/app/app-shell.tsx src/components/app/app-sidebar.tsx src/components/app/app-topbar.tsx"
UNKNOWN=$(git status --porcelain | awk '{print $2}' | grep -v -F "$(echo $KNOWN_DIRTY | tr ' ' '\n')" || true)
if [ -n "$UNKNOWN" ]; then
  echo "ERROR: Unexpected uncommitted files:"
  echo "$UNKNOWN"
  echo "Commit, stash, or adjust KNOWN_DIRTY and rerun."
  exit 1
fi

echo "==> 2. Create new folder structure"
mkdir -p \
  src/app/api/webhooks/stripe \
  src/app/api/health \
  src/app/\(app\)/app/analytics \
  src/app/\(app\)/app/customers \
  src/app/\(app\)/app/billing/invoices \
  src/app/\(app\)/app/settings/profile \
  src/app/\(app\)/app/settings/team \
  src/app/\(app\)/app/settings/api-keys \
  src/app/\(app\)/app/notifications \
  src/app/\(marketing\)/pricing \
  src/app/\(marketing\)/about \
  src/app/\(marketing\)/contact \
  src/app/\(auth\)/reset-password \
  src/components/layout \
  src/components/brand \
  src/features/dashboard/components \
  src/features/auth/components \
  src/features/billing/components \
  src/features/settings/components \
  src/features/marketing/components \
  src/lib/format \
  src/lib/validation \
  src/server/db/queries \
  src/server/auth \
  src/server/email/templates \
  src/server/stripe \
  src/hooks \
  src/types \
  src/styles \
  public/brand \
  public/avatars \
  public/icons

echo "==> 3. Move components/app/* → layout/ or features/dashboard/"
git mv src/components/app/app-right-panel.tsx src/components/layout/app-right-panel.tsx
git mv src/components/app/app-shell.tsx       src/components/layout/app-shell.tsx
git mv src/components/app/app-sidebar.tsx     src/components/layout/app-sidebar.tsx
git mv src/components/app/app-topbar.tsx      src/components/layout/app-topbar.tsx

git mv src/components/app/stat-card.tsx           src/features/dashboard/components/stat-card.tsx
git mv src/components/app/total-users-chart.tsx   src/features/dashboard/components/total-users-chart.tsx
git mv src/components/app/traffic-by-device.tsx   src/features/dashboard/components/traffic-by-device.tsx
git mv src/components/app/traffic-by-location.tsx src/features/dashboard/components/traffic-by-location.tsx
git mv src/components/app/traffic-by-website.tsx  src/features/dashboard/components/traffic-by-website.tsx
git mv src/components/app/marketing-and-seo.tsx   src/features/dashboard/components/marketing-and-seo.tsx

rmdir src/components/app

echo "==> 4. Move brand-logo into brand/"
git mv src/components/brand-logo.tsx src/components/brand/brand-logo.tsx

echo "==> 5. Rename auth reset route (D2)"
git mv src/app/\(auth\)/forgot-password/reset/page.tsx src/app/\(auth\)/reset-password/page.tsx
rmdir src/app/\(auth\)/forgot-password/reset

echo "==> 6. Rename public/foundry → public/brand (D13)"
git mv public/foundry/logo.svg     public/brand/logo.svg
git mv public/foundry/wordmark.svg public/brand/wordmark.svg
git mv public/foundry/og.svg       public/brand/og.svg
rmdir public/foundry

echo "==> 7. Flatten public/figma → public/avatars + public/icons (D12, D11)"
git mv public/figma/avatars/andi-lane.png      public/avatars/andi-lane.png
git mv public/figma/avatars/byewind.png        public/avatars/byewind.png
git mv public/figma/avatars/drew-cano.png      public/avatars/drew-cano.png
git mv public/figma/avatars/natali-craig.png   public/avatars/natali-craig.png
git mv public/figma/avatars/orlando-diggs.png  public/avatars/orlando-diggs.png
rmdir public/figma/avatars

git mv public/figma/avatar-3d-03.png        public/avatars/avatar-3d-03.png
git mv public/figma/avatar-abstract-03.png  public/avatars/avatar-abstract-03.png
git mv public/figma/avatar-abstract-04.png  public/avatars/avatar-abstract-04.png
git mv public/figma/avatar-female-03.png    public/avatars/avatar-female-03.png
git mv public/figma/avatar-male-02.png      public/avatars/avatar-male-02.png

git rm public/figma/byewind-avatar.png  # duplicate of avatars/byewind.png
rmdir public/figma

echo "==> 8. Move root icons to icons/"
git mv public/file.svg   public/icons/file.svg
git mv public/globe.svg  public/icons/globe.svg
git mv public/window.svg public/icons/window.svg

echo "==> 9. Delete scaffold artefacts"
git rm public/next.svg public/vercel.svg
git rm -f structure.txt 2>/dev/null || true

echo "==> 10. Ensure empty-dir placeholders are tracked"
: > src/server/db/queries/.gitkeep
: > src/server/email/templates/.gitkeep
git add src/server/db/queries/.gitkeep src/server/email/templates/.gitkeep

echo "==> Done. Run the import-update script next, then the create-files script."
```

---

## 4. Import Update Script

Update alle imports na de moves van sectie 3.

```bash
#!/usr/bin/env bash
# docs/superpowers/scripts/foundry-restructure-imports.sh
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

echo "==> Verify ripgrep + GNU sed (or BSD sed -i '')"
if [[ "$OSTYPE" == "darwin"* ]]; then SED_I=(-i ''); else SED_I=(-i); fi

UPDATE() {
  local OLD="$1" NEW="$2"
  echo "  $OLD  →  $NEW"
  # Use ripgrep to list files, then sed to rewrite in place.
  rg -l --fixed-strings "$OLD" src | while read -r f; do
    sed "${SED_I[@]}" "s|${OLD}|${NEW}|g" "$f"
  done
}

echo "==> 1. components/app/* → components/layout/* (shells)"
UPDATE "@/components/app/app-right-panel"  "@/components/layout/app-right-panel"
UPDATE "@/components/app/app-shell"        "@/components/layout/app-shell"
UPDATE "@/components/app/app-sidebar"      "@/components/layout/app-sidebar"
UPDATE "@/components/app/app-topbar"       "@/components/layout/app-topbar"

echo "==> 2. components/app/* → features/dashboard/components/* (widgets)"
UPDATE "@/components/app/stat-card"            "@/features/dashboard/components/stat-card"
UPDATE "@/components/app/total-users-chart"    "@/features/dashboard/components/total-users-chart"
UPDATE "@/components/app/traffic-by-device"    "@/features/dashboard/components/traffic-by-device"
UPDATE "@/components/app/traffic-by-location"  "@/features/dashboard/components/traffic-by-location"
UPDATE "@/components/app/traffic-by-website"   "@/features/dashboard/components/traffic-by-website"
UPDATE "@/components/app/marketing-and-seo"    "@/features/dashboard/components/marketing-and-seo"

echo "==> 3. components/brand-logo → components/brand/brand-logo"
UPDATE "@/components/brand-logo"  "@/components/brand/brand-logo"

echo "==> 4. public asset paths"
# Conservative: only path string literals we know exist.
UPDATE "/foundry/logo.svg"       "/brand/logo.svg"
UPDATE "/foundry/wordmark.svg"   "/brand/wordmark.svg"
UPDATE "/foundry/og.svg"         "/brand/og.svg"

UPDATE "/figma/avatar-3d-03.png"         "/avatars/avatar-3d-03.png"
UPDATE "/figma/avatar-abstract-03.png"   "/avatars/avatar-abstract-03.png"
UPDATE "/figma/avatar-abstract-04.png"   "/avatars/avatar-abstract-04.png"
UPDATE "/figma/avatar-female-03.png"     "/avatars/avatar-female-03.png"
UPDATE "/figma/avatar-male-02.png"       "/avatars/avatar-male-02.png"
UPDATE "/figma/avatars/andi-lane.png"    "/avatars/andi-lane.png"
UPDATE "/figma/avatars/byewind.png"      "/avatars/byewind.png"
UPDATE "/figma/avatars/drew-cano.png"    "/avatars/drew-cano.png"
UPDATE "/figma/avatars/natali-craig.png" "/avatars/natali-craig.png"
UPDATE "/figma/avatars/orlando-diggs.png" "/avatars/orlando-diggs.png"
UPDATE "/figma/byewind-avatar.png"       "/avatars/byewind.png"  # dedup target

UPDATE "/file.svg"    "/icons/file.svg"
UPDATE "/globe.svg"   "/icons/globe.svg"
UPDATE "/window.svg"  "/icons/window.svg"

echo "==> 5. Auth route rename (D2)"
# Only in href strings, not file paths.
UPDATE 'href="/forgot-password/reset"'  'href="/reset-password"'
UPDATE "href='/forgot-password/reset'"  "href='/reset-password'"

echo "==> 6. Verify no lingering references"
echo "  Remaining hits for @/components/app:"
rg "@/components/app" src || echo "    (clean)"
echo "  Remaining hits for /foundry/ in source:"
rg "/foundry/" src || echo "    (clean)"
echo "  Remaining hits for /figma/:"
rg "/figma/" src || echo "    (clean)"

echo "==> Done. Run pnpm exec tsc --noEmit next."
```

Belangrijk: **draai eerst sectie 3, dan sectie 4**. Anders wijst sed naar niet-bestaande files.

---

## 5. Per File: Contract

### src/proxy.ts
- **Rol:** Request-interceptie op alle routes behalve statics; auth redirects.
- **Exports:** `proxy(request)` (async), `config` (matcher).
- **Type:** server (edge/node, default).
- **Dependencies:** `next/server`, `@/server/auth/proxy-helpers`.
- **Beschermt:** `/app/**` (redirect naar `/login?next=...` als geen session). Leidt ingelogde gebruikers weg van `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify`.

### src/components/brand/brand-logo.tsx
- **Rol:** Render brand mark/wordmark uit `config/brand.ts`.
- **Props:** `{ variant?: "mark" | "wordmark"; priority?: boolean; className?: string }`.
- **Type:** server (gebruikt `next/image` wat op server werkt).

### src/components/layout/app-shell.tsx (verplaatst)
- **Rol:** Wrapper `<Sidebar /> <main /> <RightPanel />`.
- **Type:** server (children = server or client).
- **Dependencies:** `./app-sidebar`, `./app-topbar`, `./app-right-panel`.

### src/components/layout/auth-shell.tsx (nieuw)
- **Rol:** Centered card met brand mark, optionele titel, form slot.
- **Props:** `{ title?: string; children: ReactNode }`.
- **Type:** server (children rendering).

### src/components/layout/marketing-header.tsx (nieuw)
- **Rol:** Top navigation met brand wordmark + links.
- **Type:** server (gebruik `next/link`).
- **Dependencies:** `@/components/brand/brand-logo`, `@/config/site`.

### src/components/layout/marketing-footer.tsx (nieuw)
- **Rol:** Footer met brand + social links.
- **Type:** server.

### src/features/dashboard/components/*.tsx (verplaatst)
- **Rol:** Individuele widgets.
- **Type:** mix — charts mogelijk client ("use client" blijft als in huidige file).
- **Props:** zoals nu (ongewijzigd).

### src/features/dashboard/queries.ts (nieuw)
- **Rol:** Typed data fetchers voor dashboard (`getDashboardStats`, etc.).
- **Type:** server (`import "server-only"`).
- **Dependencies:** `@/server/db/client`, `@/types/database`.
- **Inhoud nu:** `export {};` stub.

### src/features/dashboard/actions.ts (nieuw)
- **Rol:** Server actions (`refreshDashboard`, etc.).
- **Header:** `"use server"`.
- **Inhoud nu:** `export {};` stub.

### src/features/auth/components/login-form.tsx (nieuw)
- **Rol:** Gecontroleerde form, consumeert `@/features/auth/actions` + `@/features/auth/schemas`.
- **Type:** client (`"use client"`).
- **Props:** `{ redirectTo?: string }`.
- **Dependencies:** `@/components/base/button`, `@/components/common/input`, `@/features/auth/actions`.

### src/features/auth/components/signup-form.tsx (nieuw)
- Gelijk patroon als login-form; 3 velden (name, email, password).

### src/features/auth/components/forgot-password-form.tsx (nieuw)
- 1 veld email, submit roept `resetPassword` action.

### src/features/auth/components/verify-form.tsx (nieuw)
- 6-digit code veld, submit roept `verifyEmail` action.

### src/features/auth/components/social-buttons.tsx (nieuw)
- 3 buttons (Apple/Google/Microsoft) met `/social/*.svg` icons.
- **Props:** `{ action?: "signin" | "signup" }`.
- **Type:** client.

### src/features/auth/actions.ts (nieuw)
- `"use server"` top.
- Functies: `signIn`, `signUp`, `signOut`, `resetPassword`, `verifyEmail`.
- Alle nu: TODO stubs die `{ error: "Not wired yet" }` returnen (D7).

### src/features/auth/schemas.ts (nieuw)
- Placeholder zoals beschreven in sectie 2.

### src/features/{billing,settings,marketing}/**
- Alle files `export {};` of minimal stub per spec-naam. Implementatie komt wanneer feature wordt gebouwd.

### src/server/auth/session.ts, providers.ts, proxy-helpers.ts (nieuw)
- Elk `import "server-only"` top.
- Retourneren `null` / `{}` tot D7 is beslist.

### src/server/db/client.ts (nieuw)
- `import "server-only"`.
- `export const db = null as unknown as never;` — fail-fast op gebruik.

### src/server/email/client.ts, src/server/stripe/client.ts (nieuw)
- Zelfde fail-fast stubs.

### src/lib/cn.ts
- Pure utility, geen deps, geen "use server" / "use client".

### src/lib/format/{currency,date,number}.ts
- `Intl.*` wrappers, pure.

### src/lib/validation/schemas.ts
- Leeg stub nu; vullen met zod bij eerste feature.

### src/hooks/use-current-user.ts (nieuw)
- `"use client"` top.
- Returnt `null` tot D7.

### src/hooks/use-debounce.ts, use-media-query.ts, use-local-storage.ts
- Standaard React hooks patronen, `"use client"`.

### src/types/*.ts
- Placeholder `export type {};`.

### src/config/{navigation,features,site}.ts
- Zoals beschreven in sectie 2.

### src/styles/fonts.ts
- `next/font` loader geëxtracteerd. `app/layout.tsx` importeert hieruit.

### src/app/layout.tsx (modify)
- Verander `Inter` loader import naar `import { inter } from "@/styles/fonts"`.

### src/app/(app)/app/page.tsx (modify via import-script)
- Imports geupdatet door sectie 4, verder ongewijzigd.

### src/app/(auth)/*/page.tsx (modify, thin wrappers)
- Elk wordt: `import { XForm } from "@/features/auth/components/x-form"; export default function XPage() { return <XForm />; }`.
- **Let op D1:** de multi-step signup pages (`signup/country`, `/name`, `/password`) blijven zelfstandige pages; ze consumeren nu stukken uit `features/auth/components/`.

### src/app/error.tsx, global-error.tsx, not-found.tsx, loading.tsx (nieuw)
- Standaard Next.js 16 templates, `"use client"` waar vereist.

### src/app/api/health/route.ts (nieuw)
```ts
export const dynamic = "force-dynamic";
export function GET() {
  return Response.json({ status: "ok", timestamp: new Date().toISOString() });
}
```

### src/app/api/webhooks/stripe/route.ts (nieuw)
```ts
export async function POST(_request: Request) {
  return new Response("Stripe webhooks not wired", { status: 501 });
}
```

---

## 6. tsconfig & Aliases

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app/*": ["./src/app/*"],
      "@/components/*": ["./src/components/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/server/*": ["./src/server/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/config/*": ["./src/config/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"],
  "exclude": ["node_modules"]
}
```

`target` gaat van `ES2017` → `ES2022` (Next.js 16 + Node 20+ draait dit gracefully, aligneert met React 19).

De meer-specifieke aliases zijn optioneel — `@/*` volstaat functioneel. Voeg ze toe als je scoped imports wilt afdwingen via ESLint (sectie 7).

---

## 7. ESLint Regels

Extend `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Enforce server isolation: client code may not import server/*.
  {
    files: ["src/components/**", "src/hooks/**", "src/features/**/components/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [{
          group: ["@/server/*"],
          message: "Client-side modules may not import from @/server. Use a Server Action or Server Component to bridge.",
        }],
      }],
    },
  },

  // Enforce lib purity: lib may not depend on server code.
  {
    files: ["src/lib/**"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@/server/*"], message: "lib/ is framework-agnostic. Move server deps out." },
          { group: ["next/*", "react", "react-dom"], message: "lib/ should be framework-agnostic." },
        ],
      }],
    },
  },

  // proxy.ts may only import from server/ and next/server.
  {
    files: ["src/proxy.ts"],
    rules: {
      "no-restricted-imports": ["error", {
        patterns: [
          { group: ["@/components/*", "@/hooks/*", "@/features/*"], message: "proxy.ts runs before React; only server/ + next/server imports allowed." },
        ],
      }],
    },
  },

  // Import ordering (uses eslint-plugin-import which next-config already ships).
  {
    rules: {
      "import/order": ["warn", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index", "type"],
        "pathGroups": [
          { "pattern": "react", "group": "external", "position": "before" },
          { "pattern": "next/**", "group": "external", "position": "before" },
          { "pattern": "@/**", "group": "internal" },
        ],
        "pathGroupsExcludedImportTypes": ["react", "next/**"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true },
      }],
    },
  },

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
```

Als `eslint-plugin-import` niet gebundeld blijkt: `pnpm add -D eslint-plugin-import` en expliciet importeren. Check met `pnpm why eslint-plugin-import` post-install.

---

## 8. Validatie Na Migratie

Checklist, in deze volgorde:

1. **Dependencies fris:**
   ```bash
   pnpm install
   ```

2. **Type check:**
   ```bash
   pnpm exec tsc --noEmit
   ```
   Verwacht: `0 errors`.

3. **Lint:**
   ```bash
   pnpm lint
   ```
   Verwacht: alleen `import/order` warnings op files die nog niet herordend zijn (kan geaccepteerd worden, of fix met `--fix`).

4. **Build:**
   ```bash
   pnpm build
   ```
   Verwacht: succesvolle build, alle routes geïndexeerd.

5. **Dev server rookroutes:**
   ```bash
   pnpm dev
   ```
   Open en controleer (200 + visuele correctheid):
   - `/` (marketing landing)
   - `/pricing`, `/about`, `/contact` (placeholders)
   - `/login`, `/signup`, `/signup/country`, `/signup/name`, `/signup/password`
   - `/forgot-password`, `/reset-password`, `/verify`
   - `/app` (redirect naar `/login` als proxy werkt en geen session — dit is **expected**)
   - `/app/analytics`, `/app/customers`, `/app/billing`, `/app/settings`, `/app/notifications`
   - `/design` (200 in dev)
   - 5 random `/design/base/*` en `/design/common/*` pagina's
   - `/api/health` (JSON response)

6. **Proxy sanity:**
   Zonder session moet `/app` redirecten naar `/login?next=/app`. Test met:
   ```bash
   curl -i http://localhost:3000/app
   ```
   Verwacht: `Location: /login?next=/app`, status 307/308.

7. **Production gate voor /design:**
   ```bash
   pnpm build && pnpm start &
   sleep 5
   curl -s -o /dev/null -w "design=%{http_code}\n" http://localhost:3000/design
   kill %1
   ```
   Verwacht: `design=404` (guard uit bestaand plan blijft werken).

8. **Git diff review:**
   ```bash
   git status
   git diff --stat
   ```
   Verwacht: veel `R` (renames) in `git status -M`, weinig pure modifications. Als je een enorme `D` + `A` paar ziet, heeft `git mv` niet gepakt — onderzoek voor commit.

9. **Broken link check:**
   ```bash
   rg -n 'src="/figma/' src  # expect empty
   rg -n '@/components/app/' src  # expect empty
   rg -n 'components/brand-logo' src  # expect empty
   ```

10. **Commit in kleine stappen:**
    Splits in ≥4 commits voor reviewability:
    - `refactor(foundry): move components/app → layout + features/dashboard`
    - `refactor(foundry): reorganize public assets`
    - `feat(foundry): scaffold features/ server/ lib/ hooks/ types/`
    - `feat(foundry): add proxy.ts with auth guard`
    - `chore(foundry): tsconfig + eslint structure rules`

---

## 9. Beslispunten

Zie bovenaan (D1–D14). Bevestig deze voor ik de scripts draai. Per beslissing: ik heb een default aanname aangenomen, maar het plan werkt ook met de alternatieven — sommige beïnvloeden alleen sectie 3/4 scripts.

**Vragen aan jou (mini):**
1. Ga akkoord met alle 14 defaults? Zo ja, wil je dat ik de shell scripts uitvoer of alleen produceer?
2. Als nee op één of meer defaults: laat me weten welke en met welk alternatief; ik update dit plan voor executie.
3. Wanneer wordt auth provider (D7) besloten? Zolang dat niet gebeurt, blijft `server/auth/**` stub en is `proxy.ts` een no-op voor ingelogde routes.
