import { brand } from "./brand";

export const site = {
  url: brand.url,
  locales: ["en"] as const,
  defaultLocale: "en" as const,
} as const;
