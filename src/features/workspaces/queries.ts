import "server-only";

import type { Workspace } from "@/features/workspaces/types";

export async function getWorkspaceBySlug(
  _slug: string,
): Promise<Workspace | null> {
  return null;
}

export async function listMyWorkspaces(): Promise<Workspace[]> {
  return [];
}

export async function getDefaultWorkspace(): Promise<Workspace | null> {
  return null;
}
