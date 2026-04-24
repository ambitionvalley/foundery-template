import "server-only";

import type { NextRequest } from "next/server";

export type ProxySession = { userId: string } | null;

export async function getSessionFromRequest(
  _request: NextRequest,
): Promise<ProxySession> {
  return null;
}
