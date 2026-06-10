"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/connexion");
    router.refresh();
  }

  return (
    <button onClick={logout} className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700">
      <LogOut className="size-4" /> Deconnexion
    </button>
  );
}
