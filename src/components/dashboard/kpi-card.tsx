import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5 ring-1 ring-white/60 transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <strong className="text-3xl font-black text-slate-950">{kpi.value}</strong>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-black text-emerald-800">{kpi.trend}</span>
      </div>
    </div>
  );
}
