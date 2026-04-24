export const appNav = [
  { label: "Overview", href: "/app" },
  { label: "Analytics", href: "/app/analytics" },
  { label: "Customers", href: "/app/customers" },
  { label: "Billing", href: "/app/billing" },
  { label: "Settings", href: "/app/settings" },
] as const;

export const marketingNav = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const settingsNav = [
  { label: "Profile", href: "/app/settings/profile" },
  { label: "Team", href: "/app/settings/team" },
  { label: "API Keys", href: "/app/settings/api-keys" },
] as const;
