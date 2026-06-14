import { cookies } from "next/headers";

export type SessionRole = "ADMIN" | "VENDEUR" | "LIVREUR" | "CLIENT";

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("kmk_session")?.value || "";
  const role = (cookieStore.get("kmk_role")?.value || "CLIENT") as SessionRole;
  const userId = session.startsWith("user:") ? session.slice(5) : null;
  return { session, userId, role };
}

export function setSessionCookies(response: Response & { cookies: { set: (...args: any[]) => void } }, userId: string, role: SessionRole) {
  response.cookies.set("kmk_session", `user:${userId}`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  response.cookies.set("kmk_role", role, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export function dashboardFor(role: string) {
  return role === "ADMIN" ? "/espace/admin" : role === "VENDEUR" ? "/espace/vendeur" : role === "LIVREUR" ? "/espace/livreur" : "/espace/client";
}
