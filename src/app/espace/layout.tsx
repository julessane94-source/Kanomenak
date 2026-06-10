import { requireSession } from "@/lib/auth-server";

export default async function SpaceLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return children;
}
