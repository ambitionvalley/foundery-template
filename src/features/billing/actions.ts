"use server";

import type { ApiResult } from "@/types/api";

export async function createCheckoutSession(
  _priceId: string,
): Promise<ApiResult<{ url: string }>> {
  return { ok: false, error: "Stripe not wired" };
}

export async function cancelSubscription(): Promise<ApiResult<null>> {
  return { ok: false, error: "Stripe not wired" };
}
