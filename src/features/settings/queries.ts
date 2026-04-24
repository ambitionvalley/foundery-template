import "server-only";

export type ApiKey = {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
};

export async function listApiKeys(): Promise<ApiKey[]> {
  return [];
}

export async function listTeamMembers(): Promise<unknown[]> {
  return [];
}
