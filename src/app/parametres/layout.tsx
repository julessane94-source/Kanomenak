import { requireSession } from "@/lib/auth-server";

export default async function SettingsLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return children;
}
