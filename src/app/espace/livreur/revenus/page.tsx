import { Wallet } from "lucide-react";

export default function CourierRevenuePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><Wallet className="size-7 text-emerald-700" /> Revenus livreur</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{["276K FCFA gagnes", "69 livraisons", "14K FCFA aujourd'hui"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-xl font-black shadow-sm">{item}</div>)}</div>
    </main>
  );
}
