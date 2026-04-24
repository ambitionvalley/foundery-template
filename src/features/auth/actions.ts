"use server";

import type { ApiResult } from "@/types/api";

export async function signIn(
  _email: string,
  _password: string,
): Promise<ApiResult<{ userId: string }>> {
  return { ok: false, error: "Auth provider not wired" };
}

export async function signUp(
  _email: string,
  _password: string,
): Promise<ApiResult<{ userId: string }>> {
  return { ok: false, error: "Auth provider not wired" };
}

export async function signOut(): Promise<ApiResult<null>> {
  return { ok: false, error: "Auth provider not wired" };
}

export async function requestPasswordReset(
  _email: string,
): Promise<ApiResult<null>> {
  return { ok: false, error: "Auth provider not wired" };
}

export async function verifyEmail(
  _token: string,
): Promise<ApiResult<null>> {
  return { ok: false, error: "Auth provider not wired" };
}
