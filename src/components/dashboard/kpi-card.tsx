import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="group rounded-xl border border-emerald-100 bg-white/95 p-4 shadow-sm shadow-emerald-950/5 ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/10 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase text-slate-500">{kpi.label}</p>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-black text-emerald-800 ring-1 ring-emerald-100">{kpi.trend}</span>
      </div>
      <strong className="mt-3 block break-words text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{kpi.value}</strong>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-2/3 rounded-full bg-emerald-700 transition group-hover:w-full" />
      </div>
    </div>
  );
}
