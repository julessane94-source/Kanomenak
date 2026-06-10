import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionRole = "ADMIN" | "VENDEUR" | "LIVREUR" | "CLIENT";

export async function getSessionRole() {
  const cookieStore = await cookies();
  const session = cookieStore.get("kmk_session")?.value;
  const role = (cookieStore.get("kmk_role")?.value || "CLIENT") as SessionRole;
  return { session, role };
}

export async function requireSession() {
  const sessionData = await getSessionRole();
  if (!sessionData.session) {
    redirect("/connexion");
  }
  return sessionData;
}

export async function requireRole(allowed: SessionRole[]) {
  const sessionData = await requireSession();
  if (!allowed.includes(sessionData.role)) {
    redirect(
      sessionData.role === "ADMIN"
        ? "/espace/admin"
        : sessionData.role === "VENDEUR"
          ? "/espace/vendeur"
          : sessionData.role === "LIVREUR"
            ? "/espace/livreur"
            : "/espace/client"
    );
  }
  return sessionData;
}
