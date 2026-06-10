import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-950/5 ring-1 ring-white/70 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-black uppercase text-slate-500">{kpi.label}</p>
        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-800">{kpi.trend}</span>
      </div>
      <strong className="mt-3 block break-words text-2xl font-black text-slate-950 sm:text-3xl">{kpi.value}</strong>
    </div>
  );
}
