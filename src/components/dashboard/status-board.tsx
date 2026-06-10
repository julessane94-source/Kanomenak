export function StatusBoard({ title, items }: { title: string; items: { label: string; value: string; tone?: "green" | "amber" | "blue" }[] }) {
  const tones = {
    green: "bg-emerald-100 text-emerald-800",
    amber: "bg-amber-100 text-amber-800",
    blue: "bg-sky-100 text-sky-800"
  };

  return (
    <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md bg-slate-50 p-3">
            <span className="text-sm font-bold text-slate-700">{item.label}</span>
            <span className={`rounded-md px-2 py-1 text-xs font-black ${tones[item.tone || "green"]}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
