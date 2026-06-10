import { CreditCard } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

export default function ClientPaymentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><CreditCard className="size-7 text-emerald-700" /> Paiements client</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{["Wave", "Orange Money", "Paiement a la livraison"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-black">{item}</h2><ActionButton label="Selectionner" doneLabel="Selectionne" icon="CreditCard" full /></div>)}</div>
    </main>
  );
}
