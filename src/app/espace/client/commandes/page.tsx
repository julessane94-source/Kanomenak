import { Truck } from "lucide-react";
import { InvoiceButton } from "@/components/client/invoice-button";

export default function ClientOrdersPage() {
  const orders = ["KMK-0001 · En livraison", "KMK-0004 · En preparation"];
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><Truck className="size-7 text-emerald-700" /> Suivi commandes</h1>
      <div className="mt-6 grid gap-4">{orders.map((order) => {
        const code = order.split(" · ")[0];
        return <div key={order} className="flex flex-col justify-between gap-3 rounded-lg border border-emerald-100 bg-white p-5 font-bold shadow-sm md:flex-row md:items-center"><span>{order}</span><InvoiceButton orderCode={code} /></div>;
      })}</div>
    </main>
  );
}
