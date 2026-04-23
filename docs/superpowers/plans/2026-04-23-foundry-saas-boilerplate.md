# Foundry — SaaS Boilerplate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current `intakely` repo into `foundry` — a GitHub-template-ready SaaS starter with a product-agnostic design system, minimal app shells, a single branding config file, an env scaffold (no SDKs pre-installed), and a fork-and-rebrand checklist in the README.

**Architecture:** Leave `src/components/base/**` and `src/components/common/**` entirely untouched (they are already generic primitives). Reorganize only `src/app/**` into route groups, introduce a single `src/config/brand.ts` as the branding source of truth, extract a shared `BrandLogo` that reads from it (replacing 8 duplicated `SnowUILogo` functions across design pages), hide `/design` behind a production `notFound()` guard, and swap SnowUI/Intakely-specific strings/assets for generic equivalents.

**Tech Stack:** Next.js 16.2.4 (App Router), React 19.2.4, Tailwind 4, TypeScript 5 strict, pnpm. No tests, no zod, no SDKs added.

**Spec:** [docs/superpowers/specs/2026-04-23-foundry-saas-boilerplate-design.md](../specs/2026-04-23-foundry-saas-boilerplate-design.md)

**Conventions this plan assumes:**
- Path alias `@/*` → `src/*` (configured in `tsconfig.json`).
- Package manager is `pnpm`.
- Dev server is started with `pnpm dev`; production simulation with `pnpm build && pnpm start`.
- "Verify" steps describe what the engineer should eyeball at `http://localhost:3000`. No automated tests exist in this repo.
- The project's `AGENTS.md` warns that Next.js APIs in this repo may differ from LLM training data. **Before writing any route/layout code, run `ls node_modules/next/dist/docs/` and skim the relevant guide.** In particular: route groups, `notFound()` in layouts, and `Metadata` export shape.

**Commit cadence:** One commit per task. Message format: `feat(foundry): <short summary>` for additions, `refactor(foundry): <short summary>` for code reorganization, `chore(foundry): <short summary>` for config/asset changes. Do NOT commit unless the user has explicitly asked for commits — if they have not, stop at "would have committed here" and wait.

---

## File Structure Map

**Files to CREATE:**

| Path                                    | Responsibility                                                           |
|-----------------------------------------|--------------------------------------------------------------------------|
| `src/config/brand.ts`                   | Single source of truth for brand name/description/url/logo/font/social   |
| `src/env.ts`                            | Thin typed accessor for `process.env` (only `appUrl` for now)            |
| `src/components/brand-logo.tsx`         | Shared brand-logo component, reads `brand.logo` + `brand.name`           |
| `src/app/design/layout.tsx`             | Dev-only guard — `notFound()` when `NODE_ENV === "production"`           |
| `src/app/(marketing)/page.tsx`          | Root `/` route — minimal brand-driven placeholder                        |
| `src/app/(auth)/login/page.tsx`         | Login form — unwired, uses `common/input` + `base/button`                |
| `src/app/(auth)/signup/page.tsx`        | Signup form — unwired, uses `common/input` + `base/button`               |
| `src/app/(app)/app/layout.tsx`          | Dashboard shell — sidebar (256px) + topbar                               |
| `src/app/(app)/app/page.tsx`            | Dashboard content — 3-card empty grid                                    |
| `public/foundry/logo.svg`               | Placeholder 28×28 mark                                                   |
| `public/foundry/wordmark.svg`           | Placeholder wordmark                                                     |
| `public/foundry/og.svg`                 | Placeholder OG image (SVG stand-in; README notes fork-owner replaces with PNG) |
| `.env.example`                          | Commented blocks for Supabase / Stripe / Resend                          |

**Files to MODIFY:**

| Path                                           | What changes                                                          |
|------------------------------------------------|-----------------------------------------------------------------------|
| `src/app/layout.tsx`                           | Reads `Metadata` + font family from `@/config/brand`                  |
| `src/app/design/page.tsx`                      | Import and use `BrandLogo`; replace "Intakely design system" with `{brand.name} design system` |
| `src/app/design/colors/page.tsx`               | Replace `SnowUILogo` + inline refs; rename theme keys `SnowUI-Light/Dark` → `Light/Dark` |
| `src/app/design/components/page.tsx`           | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/design-resources/page.tsx`     | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/effect-styles/page.tsx`        | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/spacing-size-radius/page.tsx`  | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/text-styles/page.tsx`          | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/variables/page.tsx`            | Replace `SnowUILogo` + inline refs                                    |
| `src/app/design/base/*/page.tsx` (19 files)    | Mechanical brand-string sweep (grep + replace); see Task 9             |
| `src/app/design/common/*/page.tsx` (23 files)  | Mechanical brand-string sweep (grep + replace); see Task 9             |
| `package.json`                                 | `"name": "intakely"` → `"name": "foundry"`                            |
| `README.md`                                    | Full rewrite — Foundry intro + rebrand checklist + integrations       |

**Files to DELETE:**

| Path                                        | Reason                                                             |
|---------------------------------------------|--------------------------------------------------------------------|
| `src/app/page.tsx`                          | Conflicts with `(marketing)/page.tsx` — only one file may serve `/` |
| `public/figma/snowui-logo.svg`              | SnowUI-branded asset, replaced by `public/foundry/logo.svg`       |
| `public/figma/snowui-wordmark-left.svg`     | SnowUI-branded asset                                              |
| `public/figma/snowui-wordmark-right.svg`    | SnowUI-branded asset                                              |

**Files EXPLICITLY UNTOUCHED (per spec §2):**
- All files under `src/components/base/**` and `src/components/common/**`. This includes `scroll-bar.tsx` (has "SnowUI spec" in JSDoc), `mask.tsx` (has "SnowUI spec" in JSDoc), and `input.tsx` (has `jane@intakely.com` in a JSDoc example). These are JSDoc artefacts, not runtime behavior. Leaving them matches the "primitives are already generic; don't churn them" principle.
- `src/app/globals.css` — tokens stay as-is.
- All avatar PNGs in `public/figma/*.png` and `public/figma/avatars/**` — demo assets for the design showcase, not brand assets.

---

## Task 1: Create `src/config/brand.ts`

**Files:**
- Create: `src/config/brand.ts`

- [ ] **Step 1: Create the file**

```ts
// src/config/brand.ts
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
    // Must match a font loader configured in src/app/layout.tsx.
    sans: "Inter",
  },

  // Social / SEO
  twitter: "@foundry",
  ogImage: "/foundry/og.svg",
} as const;

export type Brand = typeof brand;
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0 (no new errors). If there were prior errors they should be unchanged.

- [ ] **Step 3: Stage (do NOT commit unless user asked)**

```bash
git add src/config/brand.ts
```

---

## Task 2: Create `src/env.ts`

**Files:**
- Create: `src/env.ts`

- [ ] **Step 1: Create the file**

```ts
// src/env.ts
// Thin accessor. Swap to zod validation when the first integration is wired.
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Stage**

```bash
git add src/env.ts
```

---

## Task 3: Create placeholder brand assets

**Files:**
- Create: `public/foundry/logo.svg`
- Create: `public/foundry/wordmark.svg`
- Create: `public/foundry/og.svg`

**Context:** These are neutral placeholders. The rebrand checklist in the README tells fork-owners to replace them. `og.svg` is deliberately SVG — fork-owners swap in a real PNG later.

- [ ] **Step 1: Write `public/foundry/logo.svg` (28×28 square mark)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
  <rect width="28" height="28" rx="8" fill="#000000"/>
  <path d="M9 9 H19 V11 H11 V13 H17 V15 H11 V19 H9 Z" fill="#FFFFFF"/>
</svg>
```

- [ ] **Step 2: Write `public/foundry/wordmark.svg` (horizontal logo + text)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="120" height="28" viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg">
  <rect width="28" height="28" rx="8" fill="#000000"/>
  <path d="M9 9 H19 V11 H11 V13 H17 V15 H11 V19 H9 Z" fill="#FFFFFF"/>
  <text x="36" y="19" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="600" fill="#000000">Foundry</text>
</svg>
```

- [ ] **Step 3: Write `public/foundry/og.svg` (1200×630 placeholder)**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F9F9FA"/>
  <rect x="80" y="80" width="80" height="80" rx="20" fill="#000000"/>
  <path d="M102 102 H138 V110 H110 V118 H132 V126 H110 V140 H102 Z" fill="#FFFFFF"/>
  <text x="180" y="140" font-family="Inter, system-ui, sans-serif" font-size="72" font-weight="600" fill="#000000">Foundry</text>
  <text x="80" y="320" font-family="Inter, system-ui, sans-serif" font-size="36" fill="rgba(0,0,0,0.6)">SaaS starter template.</text>
</svg>
```

- [ ] **Step 4: Verify files exist**

Run: `ls public/foundry/`
Expected: `logo.svg  og.svg  wordmark.svg`

- [ ] **Step 5: Stage**

```bash
git add public/foundry/
```

---

## Task 4: Create `BrandLogo` shared component

**Files:**
- Create: `src/components/brand-logo.tsx`

**Context:** 8 design pages currently inline a near-identical `SnowUILogo` function. We'll extract a brand-aware replacement that reads from `@/config/brand` so the 8 copies can be deleted in Tasks 9–10.

- [ ] **Step 1: Create the file**

```tsx
// src/components/brand-logo.tsx
import Image from "next/image";
import { brand } from "@/config/brand";

export type BrandLogoProps = {
  variant?: "mark" | "wordmark";
  priority?: boolean;
  className?: string;
};

/**
 * BrandLogo — renders the product mark or wordmark from `brand.logo`.
 * Used in design docs, marketing placeholder, auth headers, and app topbar.
 */
export function BrandLogo({
  variant = "wordmark",
  priority = false,
  className,
}: BrandLogoProps) {
  if (variant === "mark") {
    return (
      <Image
        src={brand.logo.mark}
        alt={brand.name}
        width={28}
        height={28}
        priority={priority}
        className={className}
      />
    );
  }
  return (
    <Image
      src={brand.logo.wordmark}
      alt={brand.name}
      width={120}
      height={28}
      priority={priority}
      className={className}
    />
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Stage**

```bash
git add src/components/brand-logo.tsx
```

---

## Task 5: Edit `src/app/layout.tsx` to use brand

**Files:**
- Modify: `src/app/layout.tsx`

**Context:** Currently hard-codes title `"Intakely Design System — Variables"` and description referencing Intakely. Also hard-codes the `Inter` font. Switch to brand-driven metadata; keep `Inter` loader but key it off `brand.font.sans` with a guard.

- [ ] **Step 1: Replace file contents**

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { brand } from "@/config/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: brand.name,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    url: brand.url,
    images: [brand.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: brand.twitter,
    title: brand.name,
    description: brand.description,
    images: [brand.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
```

**Note:** `brand.font.sans` is declared but intentionally not read here — swapping the font means also swapping the `next/font` loader import (e.g. to `Geist`), which is a manual edit per rebrand. The field exists as documentation + future use. Keeping the loader literal avoids a dynamic-loader anti-pattern.

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Manual check**

Run: `pnpm dev`, then open `http://localhost:3000/design` (this still works because the design route guard isn't installed yet).
Expected: Browser tab title reads `Foundry` (not `Intakely Design System — Variables`).

Stop the dev server (Ctrl-C).

- [ ] **Step 4: Stage**

```bash
git add src/app/layout.tsx
```

---

## Task 6: Edit `src/app/design/page.tsx` — design index

**Files:**
- Modify: `src/app/design/page.tsx`

**Context:** Remove the inline `SnowUILogo` function (lines ~279–310), swap for `<BrandLogo />`, replace the "Intakely design system" copy with `brand.name`-driven text, and drop the now-unused `Image` import from next/image (only used by the deleted `SnowUILogo`).

- [ ] **Step 1: Read the current file to confirm line positions**

Read `src/app/design/page.tsx` and locate:
- The `import Image from "next/image";` line (currently line 1).
- The `function SnowUILogo() { ... }` definition (currently lines ~279–310).
- The `<SnowUILogo />` usage inside `DesignIndexPage` (currently line ~395).
- The copy `Documentation for the Intakely design system.` (currently line ~392).

- [ ] **Step 2: Remove the `Image` import and the entire `SnowUILogo` function**

Edit: delete `import Image from "next/image";` (line 1) **only if** no other usage exists in the file. Grep first:

Run: `grep -n 'next/image\|<Image' src/app/design/page.tsx`
If `<Image` appears anywhere other than inside `SnowUILogo`, keep the import. Otherwise remove it.

Delete the `function SnowUILogo() { ... }` block entirely.

- [ ] **Step 3: Import `BrandLogo`**

Add near the top of the file:

```tsx
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";
```

- [ ] **Step 4: Replace `<SnowUILogo />` usage and Intakely copy**

Find:
```tsx
Documentation for the Intakely design system.
```

Replace with:
```tsx
Documentation for the {brand.name} design system.
```

Find:
```tsx
<SnowUILogo />
```

Replace with:
```tsx
<BrandLogo priority />
```

- [ ] **Step 5: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 6: Verify `/design` renders**

Run: `pnpm dev`, open `http://localhost:3000/design`.
Expected: the page renders without errors, the header reads "Documentation for the Foundry design system.", the logo in the header is the new placeholder Foundry mark.

Stop dev server.

- [ ] **Step 7: Stage**

```bash
git add src/app/design/page.tsx
```

---

## Task 7: Edit 7 doc-category pages to use `BrandLogo`

**Files:**
- Modify: `src/app/design/colors/page.tsx`
- Modify: `src/app/design/components/page.tsx`
- Modify: `src/app/design/design-resources/page.tsx`
- Modify: `src/app/design/effect-styles/page.tsx`
- Modify: `src/app/design/spacing-size-radius/page.tsx`
- Modify: `src/app/design/text-styles/page.tsx`
- Modify: `src/app/design/variables/page.tsx`

**Context:** Each page has its own duplicated `SnowUILogo` function and a `<SnowUILogo />` usage in its header. Some also link to `https://snowui.byewind.com` and use `SnowUI` in copy.

Apply the same change pattern to all 7 files. Do one file completely, verify it renders, then move on — do not parallelize, because a typo in one file's header copy may not obviously fail the build and we want to eyeball each.

- [ ] **Step 1: For each file, run the per-file protocol below**

**Per-file protocol:**

1. Read the file, locate the inline `SnowUILogo` function definition. Note what `Image` imports exist and whether any are needed after removal.
2. Delete the `SnowUILogo` function entirely.
3. If `Image` from `next/image` is only used by the deleted `SnowUILogo`, remove its import. If it's also used elsewhere (e.g., `design-resources/page.tsx` may use avatars), keep the import.
4. Add `import { BrandLogo } from "@/components/brand-logo";` and `import { brand } from "@/config/brand";` if not already present.
5. Replace `<SnowUILogo />` with `<BrandLogo priority />`.
6. Replace any inline string `SnowUI` with `{brand.name}` where grammatically sensible (e.g., "In SnowUI, we use variables" → "In {brand.name}, we use variables"). **Do NOT** replace `SnowUI` inside theme-key identifiers like `"SnowUI-Light"` here — those are handled in Task 8 for the colors page specifically.
7. Replace any `https://snowui.byewind.com/...` links and `snowui.byewind.com/...` display text with `brand.url` (for `href`) and a friendlier generic label (e.g., `Design docs`) for display text. If you're unsure, use `brand.url` for the href and keep the original path suffix as display text (e.g., `foundry.example.com/variables`).

- [ ] **Step 2: After each file, type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0 after each file.

- [ ] **Step 3: After all 7 files, render-check**

Run: `pnpm dev`. For each of:
- `/design/colors`
- `/design/components`
- `/design/design-resources`
- `/design/effect-styles`
- `/design/spacing-size-radius`
- `/design/text-styles`
- `/design/variables`

Expected: page renders, header shows the Foundry wordmark, no broken-image icons, no "SnowUI" text in prose.

Stop dev server.

- [ ] **Step 4: Stage**

```bash
git add src/app/design/colors/page.tsx src/app/design/components/page.tsx src/app/design/design-resources/page.tsx src/app/design/effect-styles/page.tsx src/app/design/spacing-size-radius/page.tsx src/app/design/text-styles/page.tsx src/app/design/variables/page.tsx
```

---

## Task 8: Rename theme keys in `src/app/design/colors/page.tsx`

**Files:**
- Modify: `src/app/design/colors/page.tsx`

**Context:** The colors page uses theme-key string literals `"SnowUI-Light"`, `"SnowUI-Dark"`, `"iOS-Light"`, `"iOS-Dark"` as map keys and array values. These are not brand marketing — they're internal data. Genericize by dropping the SnowUI prefix: `"SnowUI-Light"` → `"Light"`, `"SnowUI-Dark"` → `"Dark"`. Leave `"iOS-Light"` / `"iOS-Dark"` alone — those name a real peer design system.

- [ ] **Step 1: Read the file**

Read `src/app/design/colors/page.tsx` to understand the shape of `THEMES`, `SELECTED_THEMES`, and the maps keyed by theme name.

- [ ] **Step 2: Replace every occurrence**

Perform a literal string substitution in this single file:
- `"SnowUI-Light"` → `"Light"` (replace all)
- `"SnowUI-Dark"` → `"Dark"` (replace all)

Also update the TypeScript `Theme` type / const arrays that declare these keys. Don't hand-edit by grep alone — read the file and confirm each replacement site keeps the surrounding syntax valid.

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Render-check**

Run: `pnpm dev`, open `http://localhost:3000/design/colors`.
Expected: page renders, theme columns labelled "Light" and "Dark" (plus "iOS-Light", "iOS-Dark"). Color swatches intact.

Stop dev server.

- [ ] **Step 5: Stage**

```bash
git add src/app/design/colors/page.tsx
```

---

## Task 9: Bulk sweep — base/common showcase sub-pages

**Files:**
- Modify (conditionally): all files under `src/app/design/base/**/page.tsx` and `src/app/design/common/**/page.tsx` that contain `Intakely`, `intakely`, `SnowUI`, or `snowui`.

**Context:** The earlier grep showed ~40 showcase sub-pages with brand references. These are dev-only pages and most references are in example strings or inline copy.

- [ ] **Step 1: Produce the target list**

Run:
```bash
grep -rli 'intakely\|snowui' src/app/design/base src/app/design/common > /tmp/foundry-sweep-targets.txt
cat /tmp/foundry-sweep-targets.txt
```
Expected: a list of page.tsx paths.

- [ ] **Step 2: For each file, inspect before replacing**

For each path in `/tmp/foundry-sweep-targets.txt`, open the file and find every match. Decide case-by-case:

- **Brand prose** (e.g., "the Intakely team", "SnowUI specification") → replace `Intakely` / `SnowUI` with `{brand.name}` and add the import `import { brand } from "@/config/brand";` if needed. If the whole sentence becomes awkward ("the specification"), rewrite it.
- **Example email / handle strings** (e.g., `jane@intakely.com`) → replace with a generic like `jane@example.com`. Keep as a plain string literal; don't add a brand import just for an example.
- **`/figma/snowui-*.svg` asset paths inside showcase pages** → these break in Task 12 when assets are deleted. Replace each asset path with `brand.logo.mark` or `brand.logo.wordmark` as appropriate, or remove the logo block if the page has no reason to display a brand mark.
- **Inline `function SnowUILogo()` definitions** → replace usage with `<BrandLogo />` following the Task 7 per-file protocol. (The main 8 were handled in Tasks 6–7; any stragglers land here.)

- [ ] **Step 3: Type-check after each file**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Final sweep — confirm zero matches remain under `src/app/design/**`**

Run:
```bash
grep -rli 'intakely\|snowui' src/app/design || echo "CLEAN"
```
Expected: `CLEAN`.

- [ ] **Step 5: Render-check a sample**

Run: `pnpm dev`. Hit 4–5 random showcase pages you edited (e.g., `/design/common/input`, `/design/base/button`, `/design/common/card`, `/design/common/activities`). Confirm each renders, no missing-image icons, no "SnowUI"/"Intakely" visible in prose.

Stop dev server.

- [ ] **Step 6: Stage**

```bash
git add src/app/design/base src/app/design/common
```

---

## Task 10: Create `/design` dev-only guard layout

**Files:**
- Create: `src/app/design/layout.tsx`

**Context:** One layout file hides all `/design/*` routes in production via `notFound()` inheritance.

- [ ] **Step 1: Before writing, skim the Next.js docs on layouts and `notFound`**

Run:
```bash
ls node_modules/next/dist/docs/ | head -30
```
Expected: a list of markdown files. Look for entries related to routing, layouts, or `not-found`.

Run (if found):
```bash
cat node_modules/next/dist/docs/<relevant-file>.md
```
Confirm: `notFound()` from `next/navigation` is valid inside a Server Component `layout.tsx`. `layout.tsx` is a Server Component by default unless it starts with `"use client"`.

- [ ] **Step 2: Create the file**

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

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Verify dev still shows docs**

Run: `pnpm dev`, open `http://localhost:3000/design`.
Expected: 200, normal render.

Stop dev server.

- [ ] **Step 5: Verify prod hides docs**

Run:
```bash
pnpm build
pnpm start &
sleep 5
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/design
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/design/colors
kill %1
```
Expected: both URLs return `404`.

- [ ] **Step 6: Stage**

```bash
git add src/app/design/layout.tsx
```

---

## Task 11: Delete `src/app/page.tsx`, create `(marketing)` placeholder

**Files:**
- Delete: `src/app/page.tsx`
- Create: `src/app/(marketing)/page.tsx`

**Context:** The current root page redirects to `/design`. We replace it with a marketing placeholder served via the `(marketing)` route group — `(marketing)` doesn't add a URL prefix, so `(marketing)/page.tsx` IS the `/` route. The old `page.tsx` must be deleted because Next.js disallows two files serving the same route.

- [ ] **Step 1: Before writing, confirm route-group semantics**

Run:
```bash
ls node_modules/next/dist/docs/ | grep -i 'route\|group' | head
```
Skim any matching doc. Confirm: `(marketing)/page.tsx` serves `/`, and that conflicting duplicates cause a build error.

- [ ] **Step 2: Delete the old root page**

Run:
```bash
rm src/app/page.tsx
```

- [ ] **Step 3: Create the marketing placeholder**

```tsx
// src/app/(marketing)/page.tsx
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

export default function LandingPage() {
  return (
    <main className="min-h-screen grid place-items-center bg-white p-8">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <BrandLogo priority />
        <h1 className="text-[48px] leading-[56px] font-semibold text-black">
          {brand.name}
        </h1>
        <p className="text-[14px] leading-[20px] text-black/60">
          {brand.description}
        </p>
        <p className="mt-4 text-[12px] leading-[16px] text-black/40">
          Replace this with your product&apos;s landing page.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 5: Render-check**

Run: `pnpm dev`, open `http://localhost:3000/`.
Expected: placeholder renders with Foundry wordmark, big "Foundry" heading, description, and the "Replace this…" hint. No redirect to `/design`.

Stop dev server.

- [ ] **Step 6: Stage**

```bash
git add src/app/page.tsx src/app/\(marketing\)/page.tsx
```

---

## Task 12: Create `(auth)/login/page.tsx`

**Files:**
- Create: `src/app/(auth)/login/page.tsx`

**Context:** Centered card with brand mark, two `common/input` fields, a `base/button` primary. The `onSubmit` logs a TODO — no actual auth.

- [ ] **Step 1: Review component APIs**

Read `src/components/base/button.tsx` to confirm `Button` props (`size`, `variant`, `children`, `type`).
Read `src/components/common/input.tsx` to confirm `Input` props (`type`, `title`, `children`).

- [ ] **Step 2: Create the file**

```tsx
// src/app/(auth)/login/page.tsx
"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

export default function LoginPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire auth provider (Supabase, Auth0, etc.)
    console.warn("TODO: wire login submit");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-white p-8">
      <div className="flex w-full max-w-[360px] flex-col items-stretch gap-6 rounded-[24px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center gap-3">
          <BrandLogo variant="mark" priority />
          <h1 className="text-[20px] leading-[28px] font-semibold text-black">
            Sign in to {brand.name}
          </h1>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input type="2-row-vertical" title="Email" className="w-full">
            you@example.com
          </Input>
          <Input type="2-row-vertical" title="Password" className="w-full">
            ••••••••
          </Input>
          <Button type="submit" variant="filled" className="mt-2 w-full">
            Sign in
          </Button>
        </form>
        <p className="text-center text-[12px] leading-[16px] text-black/60">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#adadfb] hover:text-black">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Render-check**

Run: `pnpm dev`, open `http://localhost:3000/login`.
Expected: centered card with Foundry mark, "Sign in to Foundry", two input-styled fields, black "Sign in" button, and a link to `/signup`.

Stop dev server.

- [ ] **Step 5: Stage**

```bash
git add src/app/\(auth\)/login/page.tsx
```

---

## Task 13: Create `(auth)/signup/page.tsx`

**Files:**
- Create: `src/app/(auth)/signup/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/app/(auth)/signup/page.tsx
"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/common/input";
import { BrandLogo } from "@/components/brand-logo";
import { brand } from "@/config/brand";

export default function SignupPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire auth provider (Supabase, Auth0, etc.)
    console.warn("TODO: wire signup submit");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-white p-8">
      <div className="flex w-full max-w-[360px] flex-col items-stretch gap-6 rounded-[24px] bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center gap-3">
          <BrandLogo variant="mark" priority />
          <h1 className="text-[20px] leading-[28px] font-semibold text-black">
            Create your {brand.name} account
          </h1>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input type="2-row-vertical" title="Name" className="w-full">
            Jane Doe
          </Input>
          <Input type="2-row-vertical" title="Email" className="w-full">
            you@example.com
          </Input>
          <Input type="2-row-vertical" title="Password" className="w-full">
            ••••••••
          </Input>
          <Button type="submit" variant="filled" className="mt-2 w-full">
            Create account
          </Button>
        </form>
        <p className="text-center text-[12px] leading-[16px] text-black/60">
          Already have an account?{" "}
          <Link href="/login" className="text-[#adadfb] hover:text-black">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 3: Render-check**

Run: `pnpm dev`, open `http://localhost:3000/signup`.
Expected: centered card, "Create your Foundry account", three fields (Name / Email / Password), "Create account" button, link to `/login`.

Stop dev server.

- [ ] **Step 4: Stage**

```bash
git add src/app/\(auth\)/signup/page.tsx
```

---

## Task 14: Create `(app)/app/layout.tsx` — dashboard shell

**Files:**
- Create: `src/app/(app)/app/layout.tsx`

**Context:** Two-column layout — 256px sidebar with brand mark + short name + 2 dummy nav items; topbar with a page-title slot, a search placeholder (plain input, not `common/search` since that component is for showcase demos), a bell icon slot, and an avatar. Content area renders `children`.

- [ ] **Step 1: Review `base/image` API**

Read `src/components/base/image.tsx` — confirm `Image` takes `size`, `src`, `alt`.

- [ ] **Step 2: Create the file**

```tsx
// src/app/(app)/app/layout.tsx
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { Image } from "@/components/base/image";
import { brand } from "@/config/brand";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f9f9fa]">
      <aside className="flex w-[256px] shrink-0 flex-col gap-6 border-r border-black/5 bg-white p-4">
        <div className="flex items-center gap-2 px-2 pt-2">
          <BrandLogo variant="mark" priority />
          <span className="text-[14px] leading-[20px] font-semibold text-black">
            {brand.shortName}
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          <Link
            href="/app"
            className="rounded-[12px] px-3 py-2 text-[14px] leading-[20px] text-black hover:bg-black/[0.04]"
          >
            Dashboard
          </Link>
          <Link
            href="/app"
            className="rounded-[12px] px-3 py-2 text-[14px] leading-[20px] text-black/60 hover:bg-black/[0.04]"
          >
            Settings
          </Link>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[64px] items-center justify-between border-b border-black/5 bg-white px-6">
          <h1 className="text-[16px] leading-[24px] font-semibold text-black">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search"
              className="w-[200px] rounded-[12px] border-[0.5px] border-black/20 bg-white/80 px-3 py-2 text-[14px] leading-[20px] outline-none focus:border-black/40"
            />
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-[12px] hover:bg-black/[0.04]"
            >
              <span aria-hidden>🔔</span>
            </button>
            <Image size={32} src="/figma/avatar-3d-03.png" alt="" />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
```

**Note on the bell:** Using an emoji is a deliberate placeholder — the existing `common/notifications-anchor` is a full popover component unsuited for a header button. Fork-owners wire their real bell. Emoji avoids introducing new component dependencies.

**Note on the avatar path:** `/figma/avatar-3d-03.png` is one of the demo avatars already in `public/figma/`. It stays (spec §10 marks avatars as demo assets, not brand assets).

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Stage**

```bash
git add src/app/\(app\)/app/layout.tsx
```

---

## Task 15: Create `(app)/app/page.tsx` — dashboard content

**Files:**
- Create: `src/app/(app)/app/page.tsx`

- [ ] **Step 1: Review `common/card` API**

Read `src/components/common/card.tsx` — confirm `Card` props (`state`, `vertical`, `count`, `children`).

- [ ] **Step 2: Create the file**

```tsx
// src/app/(app)/app/page.tsx
import { Card } from "@/components/common/card";

export default function AppPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[14px] leading-[20px] text-black/60">
        Replace this with your app.
      </p>
      <div className="flex flex-wrap gap-4">
        <Card count={3} />
        <Card count={3} />
        <Card count={3} />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: exits 0.

- [ ] **Step 4: Render-check**

Run: `pnpm dev`, open `http://localhost:3000/app`.
Expected: sidebar on the left with Foundry mark + "Foundry" + Dashboard/Settings nav. Topbar with "Dashboard" title, Search input, bell emoji, avatar. Main content shows the "Replace this with your app." line and 3 placeholder cards.

Stop dev server.

- [ ] **Step 5: Stage**

```bash
git add src/app/\(app\)/app/page.tsx
```

---

## Task 16: Create `.env.example`

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Write the file**

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

- [ ] **Step 2: Verify**

Run: `cat .env.example`
Expected: file contents match the block above.

- [ ] **Step 3: Stage**

```bash
git add .env.example
```

---

## Task 17: Delete SnowUI-branded assets

**Files:**
- Delete: `public/figma/snowui-logo.svg`
- Delete: `public/figma/snowui-wordmark-left.svg`
- Delete: `public/figma/snowui-wordmark-right.svg`

**Context:** After Tasks 6–9, no source file should reference these paths. Deleting makes the contract explicit.

- [ ] **Step 1: Confirm zero remaining source references**

Run:
```bash
grep -rl 'snowui-logo\|snowui-wordmark' src public 2>/dev/null || echo "CLEAN"
```
Expected: `CLEAN`. (Matching the string inside source files, not the asset files themselves. `public` is in the grep root to catch any import, but since we're about to delete the assets, the grep should exclude them — if the grep finds `public/figma/snowui-*.svg`, that's expected and fine; we're only worried about `src/**` references.)

If matches appear under `src/`: stop and fix them. Those references will 404 in production.

- [ ] **Step 2: Delete the three SVGs**

```bash
rm public/figma/snowui-logo.svg public/figma/snowui-wordmark-left.svg public/figma/snowui-wordmark-right.svg
```

- [ ] **Step 3: Verify build succeeds (catches any remaining broken imports)**

Run: `pnpm build`
Expected: build completes without errors referencing the deleted files. Warnings are acceptable.

- [ ] **Step 4: Stage**

```bash
git add public/figma/
```

---

## Task 18: Rewrite `README.md`

**Files:**
- Modify (full rewrite): `README.md`

- [ ] **Step 1: Replace file contents**

```markdown
# Foundry

SaaS starter template — Next.js 16 · React 19 · Tailwind 4 · TypeScript strict.
No integrations pre-wired; opinionated shells and a full design system ready to fork.

## What's in the box

- **Design system** — 19 base primitives + 23 common components, tokens in `globals.css`.
  Browse locally at `/design` (returns 404 in production).
- **App shells** — `(marketing)`, `(auth)`, `(app)` route groups with placeholder pages.
- **Branding** — one file (`src/config/brand.ts`) controls name, description, logo, font.
- **Env scaffold** — `.env.example` with commented blocks for Supabase, Stripe, Resend.

## Quick start

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000 — marketing placeholder.
Visit http://localhost:3000/design — design system (dev-only).
Visit http://localhost:3000/login, `/signup`, `/app` — unwired shells.

## Fork-and-rebrand checklist

After clicking "Use this template" on GitHub and cloning the new repo:

- [ ] Rename `package.json` → set `"name"` to your product slug.
- [ ] Update `src/config/brand.ts` — `name`, `shortName`, `description`, `url`, `twitter`, `ogImage`.
- [ ] Replace logos in `public/foundry/` — `logo.svg`, `wordmark.svg`, `og.svg` (swap to a real `og.png` and update `brand.ogImage`).
- [ ] Rename `public/foundry/` to match your slug if you prefer, then update `brand.logo.*` paths.
- [ ] Tune tokens in `src/app/globals.css` — primary color, anything semantic.
- [ ] Rewrite `src/app/(marketing)/page.tsx` with your real landing page.
- [ ] Decide whether to keep the `/design` docs in your fork. Delete `src/app/design/` if not.
- [ ] Delete this "Fork-and-rebrand checklist" section; replace the README with your product's real intro.

## Adding integrations

Foundry ships with no SDKs pre-installed. When you need one:

- **Supabase** — `pnpm add @supabase/supabase-js @supabase/ssr`, uncomment the
  Supabase block in `.env`, create `src/lib/supabase/{client,server}.ts`.
  Use the new key naming: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (client-safe)
  and `SUPABASE_SECRET_KEY` (server-only).
- **Stripe** — `pnpm add stripe`, uncomment the Stripe block, create
  `src/lib/stripe.ts` + `app/api/stripe/webhook/route.ts`.
- **Resend** — `pnpm add resend react-email @react-email/components`, uncomment
  the Resend block, create `src/lib/resend.ts`.

Switch `src/env.ts` to zod validation once you depend on any of these.

## Tech

- Next.js 16 App Router · React 19 · Tailwind 4 · TypeScript strict
- pnpm as package manager
- ESLint flat config (Next.js default)
```

- [ ] **Step 2: Verify**

Run: `head -5 README.md`
Expected: first line is `# Foundry`.

- [ ] **Step 3: Stage**

```bash
git add README.md
```

---

## Task 19: Rename `package.json`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Edit**

Find:
```json
"name": "intakely",
```

Replace with:
```json
"name": "foundry",
```

- [ ] **Step 2: Verify**

Run: `grep '"name"' package.json`
Expected: `"name": "foundry",`

- [ ] **Step 3: Reinstall to update the lockfile workspace name**

Run: `pnpm install`
Expected: installs cleanly; `pnpm-lock.yaml` may be updated.

- [ ] **Step 4: Stage**

```bash
git add package.json pnpm-lock.yaml
```

---

## Task 20: Final verification

**Files:** none — this is a read-only verification pass.

- [ ] **Step 1: Grep for any remaining Intakely/SnowUI references in source**

Run:
```bash
grep -rni 'intakely\|snowui' src public --exclude-dir=node_modules 2>/dev/null | grep -v '^src/components/base\|^src/components/common' || echo "CLEAN"
```
Expected: `CLEAN`.

Any hits inside `src/components/base/**` or `src/components/common/**` are intentionally untouched per spec §2 (JSDoc comments only). If a hit appears anywhere else, fix it before proceeding.

- [ ] **Step 2: Build must pass**

Run: `pnpm build`
Expected: exits 0, no broken image references, no missing module errors.

- [ ] **Step 3: End-to-end manual walkthrough**

Run: `pnpm dev`. Open each URL and confirm:

| URL                          | Expected                                                                |
|------------------------------|-------------------------------------------------------------------------|
| `/`                          | Marketing placeholder with Foundry wordmark + "Replace this" hint       |
| `/login`                     | Centered auth card, "Sign in to Foundry", Email + Password, link to signup |
| `/signup`                    | Centered auth card, "Create your Foundry account", three fields        |
| `/app`                       | Sidebar + topbar + three placeholder cards                              |
| `/design`                    | Design system index, Foundry wordmark in header                        |
| `/design/colors`             | Theme columns labelled "Light", "Dark", "iOS-Light", "iOS-Dark"        |
| `/design/variables`          | Renders; no SnowUI wordmark                                             |

Stop dev server.

- [ ] **Step 4: Production simulation — `/design` must 404**

Run:
```bash
pnpm build
pnpm start &
sleep 5
curl -s -o /dev/null -w "design=%{http_code}\n" http://localhost:3000/design
curl -s -o /dev/null -w "design-colors=%{http_code}\n" http://localhost:3000/design/colors
curl -s -o /dev/null -w "root=%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "app=%{http_code}\n" http://localhost:3000/app
curl -s -o /dev/null -w "login=%{http_code}\n" http://localhost:3000/login
kill %1
```
Expected:
```
design=404
design-colors=404
root=200
app=200
login=200
```

- [ ] **Step 5: Brand-config smoke test**

Temporarily edit `src/config/brand.ts` — change `name: "Foundry"` to `name: "Test Product"`. Run `pnpm dev`, open `/`, `/login`, `/signup`, `/app`, `/design`. Confirm each page's brand text updates to "Test Product". Revert the change.

Run: `git diff src/config/brand.ts`
Expected: no diff after revert.

- [ ] **Step 6: Done**

The branch now contains a working Foundry template. No commit in this task — it's verification only.

---

## Final check — spec coverage

- §3 (Directory structure): Task 1–3, 10–15, 17 cover all CREATE/DELETE entries; Task 19 handles the `package.json` rename.
- §4 (`brand.ts`): Task 1 creates; Tasks 5, 6, 7, 11–15, 18 consume.
- §5 (Dev-only `/design`): Task 10 adds the guard; Task 20 Step 4 verifies.
- §6 (Shells): Tasks 11–15 build marketing/auth/app.
- §7 (Env scaffold): Task 16 creates `.env.example`; Task 2 creates `src/env.ts`.
- §8 (README): Task 18.
- §9 (Manual verification): Task 20.
- §10 (Risks — `SnowUILogo` breakage, design-page branding sweep): Tasks 4, 6, 7, 8, 9, 17.
