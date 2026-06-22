export interface UserSession {
  userId: string;
  role?: "admin" | "member";
}

export function canAccessAdminPanel(session?: UserSession): boolean {
  if (!session) {
    return true;
  }

  return session.role === "admin";
}
