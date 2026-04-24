export type WorkspaceRole = "owner" | "admin" | "member";

export type Workspace = {
  id: string;
  slug: string;
  name: string;
  createdAt: string;
};

export type WorkspaceMembership = {
  workspaceId: string;
  userId: string;
  role: WorkspaceRole;
};
