import "server-only";

export type Subscription = {
  id: string;
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: string;
};

export async function getSubscription(): Promise<Subscription | null> {
  return null;
}

export async function listInvoices(): Promise<unknown[]> {
  return [];
}
