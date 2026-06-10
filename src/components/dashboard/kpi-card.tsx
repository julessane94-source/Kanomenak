import type { Kpi } from "@/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm ring-1 ring-white/60">
      <p className="text-sm font-bold uppercase tracking-wide text-slate-500">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <strong className="text-3xl font-black text-slate-950">{kpi.value}</strong>
        <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-800">{kpi.trend}</span>
      </div>
    </div>
  );
}
