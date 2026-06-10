import { redirect } from "next/navigation";
import { getSessionRole } from "@/lib/auth-server";

export default async function SpacePage() {
  const { role } = await getSessionRole();
  redirect(
    role === "ADMIN"
      ? "/espace/admin"
      : role === "VENDEUR"
        ? "/espace/vendeur"
        : role === "LIVREUR"
          ? "/espace/livreur"
          : "/espace/client"
  );
}
