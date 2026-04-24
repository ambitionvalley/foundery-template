export const marketingNav = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * App navigation — workspace-scoped. Pass the `[workspace]` slug from the
 * current route (via `useParams()` in client components, or `await params`
 * in Server Components) to produce the real hrefs.
 */
export function buildAppNav(workspace: string) {
  const base = `/${workspace}`;
  return [
    { label: "Overview", href: `${base}/dashboard` },
    { label: "Analytics", href: `${base}/analytics` },
    { label: "Customers", href: `${base}/customers` },
    { label: "Billing", href: `${base}/billing` },
    { label: "Settings", href: `${base}/settings` },
  ] as const;
}

export function buildSettingsNav(workspace: string) {
  const base = `/${workspace}/settings`;
  return [
    { label: "Profile", href: `${base}/profile` },
    { label: "Team", href: `${base}/team` },
    { label: "API Keys", href: `${base}/api-keys` },
  ] as const;
}
