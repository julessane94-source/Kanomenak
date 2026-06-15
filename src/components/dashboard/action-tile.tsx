import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function ActionTile({ href, label, description, icon: Icon, tone = "primary" }: { href: string; label: string; description: string; icon: LucideIcon; tone?: "primary" | "light" }) {
  const primary = tone === "primary";

  return (
    <Link
      href={href}
      className={primary
        ? "group flex min-h-24 items-start gap-3 rounded-2xl bg-gradient-to-br from-emerald-950 via-emerald-700 to-teal-600 p-4 text-white shadow-xl shadow-emerald-950/14 ring-1 ring-emerald-500/20 hover:-translate-y-1 hover:shadow-2xl sm:min-h-32 sm:gap-4 sm:p-5"
        : "group flex min-h-24 items-start gap-3 rounded-2xl border border-emerald-900/10 bg-white/95 p-4 text-slate-900 shadow-xl shadow-emerald-950/6 ring-1 ring-white/80 hover:-translate-y-1 hover:border-teal-300 hover:bg-gradient-to-br hover:from-white hover:to-emerald-50 hover:shadow-2xl hover:shadow-emerald-950/10 sm:min-h-32 sm:gap-4 sm:p-5"}
    >
      <span className={primary ? "grid size-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-white/10 sm:size-12" : "grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-800 ring-1 ring-emerald-200 sm:size-12"}>
        <Icon className="size-5" />
      </span>
      <span className="min-w-0">
        <strong className="block text-base font-black sm:text-lg">{label}</strong>
        <span className={primary ? "mt-1 block text-xs font-semibold leading-5 text-emerald-50" : "mt-1 block text-xs font-semibold leading-5 text-slate-500"}>{description}</span>
      </span>
    </Link>
  );
}
