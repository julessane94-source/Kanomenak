"use client";

import { useState } from "react";
import { Eye, PackageCheck, Truck } from "lucide-react";

const initialOrders = [
  { code: "KMK-0001", status: "A confirmer", customer: "Client Demo", items: 1 },
  { code: "KMK-0007", status: "En preparation", customer: "Aminata D.", items: 2 },
  { code: "KMK-0012", status: "Pret livreur", customer: "Mamadou N.", items: 3 }
];

export function SellerOrderCenter() {
  const [orders, setOrders] = useState(initialOrders);
  const [details, setDetails] = useState(initialOrders[0]);
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section>
        <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><PackageCheck className="size-7 text-emerald-700" /> Commandes vendeur</h1>
        <div className="mt-6 grid gap-4">{orders.map((order) => (
          <article key={order.code} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div><h2 className="font-black">{order.code}</h2><p className="text-sm text-slate-600">{order.customer} · {order.items} produit(s) · {order.status}</p></div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setOrders((current) => current.map((item) => item.code === order.code ? { ...item, status: "Confirmee" } : item))} className="flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white"><PackageCheck className="size-4" /> Confirmer</button>
                <button type="button" onClick={() => setOrders((current) => current.map((item) => item.code === order.code ? { ...item, status: "Livreur demande" } : item))} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-black text-slate-700"><Truck className="size-4" /> Livreur</button>
                <button type="button" onClick={() => setDetails(order)} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-black text-slate-700"><Eye className="size-4" /> Details</button>
              </div>
            </div>
          </article>
        ))}</div>
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">Details commande</h2>
        <p className="mt-3 font-bold">{details.code}</p>
        <p className="text-sm text-slate-600">{details.customer}</p>
        <p className="mt-3 rounded-md bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{details.status}</p>
      </aside>
    </main>
  );
}
