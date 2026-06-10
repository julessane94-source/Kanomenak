import { Wallet } from "lucide-react";

export default function SellerRevenuePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><Wallet className="size-7 text-emerald-700" /> Revenus vendeur</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{["4,8M FCFA ventes", "320K FCFA commissions", "2 retraits en attente"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-xl font-black shadow-sm">{item}</div>)}</div>
    </main>
  );
}
