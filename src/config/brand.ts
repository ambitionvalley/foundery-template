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
