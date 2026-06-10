"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Clock, Download, MapPin, MessageCircle, PackageCheck, Search, Truck } from "lucide-react";
import { InvoiceButton } from "@/components/client/invoice-button";

const initialOrders = [
  { code: "KMK-0001", status: "En livraison", address: "Plateau, Dakar", total: "14 000 FCFA", step: 3 },
  { code: "KMK-0004", status: "En preparation", address: "Medina, Dakar", total: "8 500 FCFA", step: 2 },
  { code: "KMK-0012", status: "Livree", address: "Almadies, Dakar", total: "22 000 FCFA", step: 4 }
];

export function ClientOrderCenter() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(initialOrders[0]);
  const [support, setSupport] = useState("");
  const orders = useMemo(() => initialOrders.filter((order) => order.code.toLowerCase().includes(query.toLowerCase()) || order.status.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-black text-slate-950"><Truck className="size-6 text-emerald-700" /> Suivi commandes</h1>
            <p className="text-sm font-semibold text-slate-500">Statut, facture et assistance pour chaque commande.</p>
          </div>
          <label className="flex h-11 items-center gap-2 rounded-md border border-slate-200 px-3">
            <Search className="size-4 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher" className="w-full outline-none" />
          </label>
        </div>
        <div className="mt-5 grid gap-3">
          {orders.map((order) => (
            <button key={order.code} type="button" onClick={() => setSelected(order)} className={`rounded-lg border p-4 text-left transition hover:-translate-y-0.5 ${selected.code === order.code ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <strong className="text-slate-950">{order.code}</strong>
                  <p className="text-sm text-slate-600">{order.status} · {order.address}</p>
                </div>
                <span className="font-black text-emerald-700">{order.total}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">{selected.code}</h2>
        <p className="mt-1 text-sm font-semibold text-slate-500">{selected.status}</p>
        <div className="mt-5 grid gap-3">
          {["Commande recue", "Paiement confirme", "En livraison", "Terminee"].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              <span className={`grid size-8 place-items-center rounded-full ${index < selected.step ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-400"}`}>{index < selected.step ? <CheckCircle className="size-4" /> : <Clock className="size-4" />}</span>
              <span className="text-sm font-bold text-slate-700">{step}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-2">
          <InvoiceButton orderCode={selected.code} />
          <button type="button" onClick={() => setSupport("WhatsApp ouvert pour " + selected.code)} className="flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-3 font-black text-white hover:bg-emerald-800"><MessageCircle className="size-4" /> Contacter</button>
          <button type="button" onClick={() => setSupport("Position consultee: " + selected.address)} className="flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 font-black text-slate-700 hover:bg-slate-50"><MapPin className="size-4" /> Voir position</button>
        </div>
        {support && <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{support}</p>}
      </aside>
    </div>
  );
}
