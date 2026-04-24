"use client";

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
} | null;

export function useCurrentUser(): CurrentUser {
  return null;
}
