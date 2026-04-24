export type TeamRole = "owner" | "admin" | "member";

export type TeamMember = {
  id: string;
  email: string;
  name: string | null;
  role: TeamRole;
};
