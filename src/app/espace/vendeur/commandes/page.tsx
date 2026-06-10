import { PackageCheck, Eye } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

const orders = ["KMK-0001", "KMK-0007", "KMK-0012"];

export default function SellerOrdersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><PackageCheck className="size-7 text-emerald-700" /> Commandes vendeur</h1>
      <div className="mt-6 grid gap-4">{orders.map((order, index) => <article key={order} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h2 className="font-black">{order}</h2><p className="text-sm text-slate-600">Commande client · {index + 1} produit(s)</p></div><div className="flex flex-wrap gap-2"><ActionButton label="Confirmer" doneLabel="Confirmee" icon="PackageCheck" /><ActionButton label="Details" doneLabel="Details ouverts" icon="Eye" variant="outline" /></div></div></article>)}</div>
    </main>
  );
}
