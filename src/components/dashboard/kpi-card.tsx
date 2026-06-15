import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-emerald-900/10 bg-white/95 p-4 shadow-xl shadow-emerald-950/6 ring-1 ring-white/80 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-2xl hover:shadow-emerald-950/12 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase text-slate-500">{kpi.label}</p>
        <span className="rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 px-2.5 py-1 text-[11px] font-black text-emerald-900 ring-1 ring-emerald-100">{kpi.trend}</span>
      </div>
      <strong className="mt-3 block break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{kpi.value}</strong>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-50">
        <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-800 via-teal-600 to-amber-400 transition group-hover:w-full" />
      </div>
    </div>
  );
}
