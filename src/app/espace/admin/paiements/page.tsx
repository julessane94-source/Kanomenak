import { CreditCard } from "lucide-react";

export default function AdminPaymentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><CreditCard className="size-7 text-emerald-700" /> Supervision paiements</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{["Wave: 24 paiements", "Orange Money: 31 paiements", "Livraison: 18 a encaisser"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-xl font-black shadow-sm">{item}</div>)}</div>
    </main>
  );
}
