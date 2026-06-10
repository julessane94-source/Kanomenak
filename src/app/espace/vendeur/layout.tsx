import { requireRole } from "@/lib/auth-server";

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["VENDEUR", "ADMIN"]);
  return children;
}
