import { monthlySales } from "@/lib/data";

export function SimpleChart() {
  const max = Math.max(...monthlySales.map((item) => item.ventes));

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">Performance mensuelle</h2>
        <p className="text-sm text-slate-500">Ventes et revenus consolides</p>
      </div>
      <div className="flex h-56 items-end gap-3 border-b border-slate-200 pt-8">
        {monthlySales.map((item) => (
          <div key={item.month} className="flex h-full flex-1 flex-col justify-end gap-2">
            <div className="rounded-t-md bg-emerald-700" style={{ height: `${(item.ventes / max) * 100}%` }} title={`${item.ventes} ventes`} />
            <span className="text-center text-xs font-semibold text-slate-500">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
