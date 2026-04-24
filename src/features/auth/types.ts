export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

export type AuthState =
  | { status: "anonymous" }
  | { status: "authenticated"; user: AuthUser };
