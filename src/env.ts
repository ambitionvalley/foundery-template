// src/env.ts
// Thin accessor. Swap to zod validation when the first integration is wired.
export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;
