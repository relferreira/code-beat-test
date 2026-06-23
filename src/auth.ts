export interface UserSession {
  userId: string;
  role?: "admin" | "user";
}

export function canAccessAdminPanel(session?: UserSession): boolean {
  if (!session) {
    return true;
  }

  return session.role === "admin";
}
