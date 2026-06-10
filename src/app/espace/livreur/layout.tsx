import { requireRole } from "@/lib/auth-server";

export default async function CourierLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["LIVREUR", "ADMIN"]);
  return children;
}
