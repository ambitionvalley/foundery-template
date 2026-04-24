"use server";

import type { ApiResult } from "@/types/api";
import type { Workspace } from "@/features/workspaces/types";

export async function createWorkspace(
  _name: string,
  _slug: string,
): Promise<ApiResult<Workspace>> {
  return { ok: false, error: "Not wired" };
}

export async function renameWorkspace(
  _id: string,
  _name: string,
): Promise<ApiResult<null>> {
  return { ok: false, error: "Not wired" };
}

export async function deleteWorkspace(_id: string): Promise<ApiResult<null>> {
  return { ok: false, error: "Not wired" };
}
