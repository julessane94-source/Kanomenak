"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, PackageCheck, Truck } from "lucide-react";

const initialOrders = [
  { code: "KMK-0001", status: "Assignee", risk: "Normal" },
  { code: "KMK-0007", status: "En transit", risk: "Normal" },
  { code: "KMK-0012", status: "A verifier", risk: "Litige" }
];

export function AdminOrderCenter() {
  const [orders, setOrders] = useState(initialOrders);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><PackageCheck className="size-7 text-emerald-700" /> Supervision commandes</h1>
      <div className="mt-6 grid gap-4">{orders.map((order) => (
        <article key={order.code} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div><h2 className="font-black">{order.code}</h2><p className="text-sm font-semibold text-slate-500">{order.status} · {order.risk}</p></div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setOrders((current) => current.map((item) => item.code === order.code ? { ...item, status: "Validee", risk: "Normal" } : item))} className="flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white"><CheckCircle className="size-4" /> Valider</button>
              <button type="button" onClick={() => setOrders((current) => current.map((item) => item.code === order.code ? { ...item, status: "Livreur reassigne" } : item))} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><Truck className="size-4" /> Reassigner</button>
              <button type="button" onClick={() => setOrders((current) => current.map((item) => item.code === order.code ? { ...item, risk: "Litige ouvert" } : item))} className="flex h-11 items-center gap-2 rounded-md border border-amber-200 px-4 font-black text-amber-800"><AlertTriangle className="size-4" /> Litige</button>
            </div>
          </div>
        </article>
      ))}</div>
    </main>
  );
}
