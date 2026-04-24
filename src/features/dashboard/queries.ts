import "server-only";

export type DashboardStats = {
  views: number;
  visits: number;
  newUsers: number;
  activeUsers: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  return { views: 0, visits: 0, newUsers: 0, activeUsers: 0 };
}
