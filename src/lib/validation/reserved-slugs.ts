/**
 * Slugs that may NOT be used as a workspace name because they collide with
 * top-level application routes, static asset folders, or future product
 * areas. The workspace layout short-circuits to notFound() when the
 * `[workspace]` segment matches one of these.
 *
 * Keep in sync with the route tree in src/app/ and any public/ folders
 * accessed without leading underscores.
 */
export const RESERVED_SLUGS = new Set<string>([
  // Route groups' children (flat URL segments)
  "login",
  "signup",
  "forgot-password",
  "reset-password",
  "verify",
  "onboarding",
  "pricing",
  "about",
  "contact",

  // Framework / infrastructure
  "_next",
  "api",
  "design",

  // public/ folders (proxy matcher already excludes, but defense in depth)
  "brand",
  "avatars",
  "icons",
  "social",

  // Reserved for future product routes
  "admin",
  "app",
  "dashboard",
  "docs",
  "blog",
  "help",
  "support",
  "status",
  "legal",
  "privacy",
  "terms",
  "settings",
  "billing",
  "account",
  "notifications",
]);

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

export function isValidSlug(value: string): boolean {
  return SLUG_RE.test(value) && !RESERVED_SLUGS.has(value);
}
