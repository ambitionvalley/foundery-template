# Foundry

SaaS starter template — Next.js 16 · React 19 · Tailwind 4 · TypeScript strict.
No integrations pre-wired; opinionated shells and a full design system ready to fork.

## What's in the box

- **Design system** — 19 base primitives + 23 common components, tokens in `globals.css`.
  Browse locally at `/design` (returns 404 in production).
- **App shells** — `(marketing)`, `(auth)`, `(protected)` route groups. Workspace-scoped pages live under `(protected)/[workspace]/*`.
- **Branding** — one file (`src/config/brand.ts`) controls name, description, logo, font.
- **Env scaffold** — `.env.example` with commented blocks for Supabase, Stripe, Resend.

## Quick start

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000 — marketing placeholder.
Visit http://localhost:3000/design — design system (dev-only).
Visit http://localhost:3000/login, `/signup`, `/acme/dashboard` — unwired shells (`acme` is any workspace slug).

## Fork-and-rebrand checklist

After clicking "Use this template" on GitHub and cloning the new repo:

- [ ] Rename `package.json` → set `"name"` to your product slug.
- [ ] Update `src/config/brand.ts` — `name`, `shortName`, `description`, `url`, `twitter`, `ogImage`.
- [ ] Replace logos in `public/brand/` — `logo.svg`, `wordmark.svg`, `og.svg` (swap to a real `og.png` and update `brand.ogImage`).
- [ ] Rename `public/brand/` to match your slug if you prefer, then update `brand.logo.mark` / `brand.logo.wordmark` paths (and the proxy matcher exclusion in `src/proxy.ts`).
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
