"use server";

import type { ApiResult } from "@/types/api";

export async function updateProfile(
  _name: string,
): Promise<ApiResult<null>> {
  return { ok: false, error: "Not wired" };
}

export async function createApiKey(
  _name: string,
): Promise<ApiResult<{ key: string }>> {
  return { ok: false, error: "Not wired" };
}

export async function revokeApiKey(_id: string): Promise<ApiResult<null>> {
  return { ok: false, error: "Not wired" };
}

export async function inviteTeamMember(
  _email: string,
): Promise<ApiResult<null>> {
  return { ok: false, error: "Not wired" };
}
