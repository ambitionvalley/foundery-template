import "server-only";

import { cookies } from "next/headers";

export type Session = {
  userId: string;
  email: string;
} | null;

export async function getSession(): Promise<Session> {
  await cookies();
  return null;
}
