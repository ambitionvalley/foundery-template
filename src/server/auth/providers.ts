import "server-only";

export const authProviders = {
  email: true,
  google: false,
  apple: false,
  microsoft: false,
} as const;

export type AuthProvider = keyof typeof authProviders;
