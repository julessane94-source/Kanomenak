import { Truck } from "lucide-react";

export default function ClientOrdersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><Truck className="size-7 text-emerald-700" /> Suivi commandes</h1>
      <div className="mt-6 grid gap-4">{["KMK-0001 · En livraison", "KMK-0004 · En preparation"].map((order) => <div key={order} className="rounded-lg border border-slate-200 bg-white p-5 font-bold shadow-sm">{order}</div>)}</div>
    </main>
  );
}
