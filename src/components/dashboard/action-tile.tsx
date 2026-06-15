import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function ActionTile({ href, label, description, icon: Icon, tone = "primary" }: { href: string; label: string; description: string; icon: LucideIcon; tone?: "primary" | "light" }) {
  const primary = tone === "primary";

  return (
    <Link
      href={href}
      className={primary
        ? "group flex min-h-24 items-start gap-3 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-950 p-4 text-white shadow-lg shadow-emerald-950/10 ring-1 ring-emerald-500/20 hover:-translate-y-1 hover:shadow-xl sm:min-h-32 sm:gap-4 sm:p-5"
        : "group flex min-h-24 items-start gap-3 rounded-xl border border-emerald-100 bg-white/95 p-4 text-slate-900 shadow-sm shadow-emerald-950/5 ring-1 ring-white/70 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-xl hover:shadow-emerald-950/10 sm:min-h-32 sm:gap-4 sm:p-5"}
    >
      <span className={primary ? "grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/10 sm:size-12" : "grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 sm:size-12"}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <strong className="block text-base font-black sm:text-lg">{label}</strong>
        <span className={primary ? "mt-1 block text-xs font-semibold leading-5 text-emerald-50" : "mt-1 block text-xs font-semibold leading-5 text-slate-500"}>{description}</span>
      </span>
    </Link>
  );
}
