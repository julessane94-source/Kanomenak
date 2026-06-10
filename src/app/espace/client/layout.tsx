import { requireRole } from "@/lib/auth-server";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["CLIENT", "ADMIN"]);
  return children;
}
