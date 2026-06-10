import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function ActionTile({ href, label, description, icon: Icon, tone = "primary" }: { href: string; label: string; description: string; icon: LucideIcon; tone?: "primary" | "light" }) {
  const primary = tone === "primary";

  return (
    <Link
      href={href}
      className={primary
        ? "group flex min-h-32 items-start gap-4 rounded-lg bg-emerald-800 p-5 text-white shadow-sm ring-1 ring-emerald-500/20 hover:-translate-y-0.5 hover:bg-emerald-900 hover:shadow-md"
        : "group flex min-h-32 items-start gap-4 rounded-lg border border-emerald-100 bg-white p-5 text-slate-900 shadow-sm ring-1 ring-white/70 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md"}
    >
      <span className={primary ? "grid size-12 shrink-0 place-items-center rounded-md bg-white/15" : "grid size-12 shrink-0 place-items-center rounded-md bg-emerald-100 text-emerald-700"}>
        <Icon className="size-5" />
      </span>
      <span>
        <strong className="block text-lg">{label}</strong>
        <span className={primary ? "mt-1 block text-xs font-semibold leading-5 text-emerald-50" : "mt-1 block text-xs font-semibold leading-5 text-slate-500"}>{description}</span>
      </span>
    </Link>
  );
}
