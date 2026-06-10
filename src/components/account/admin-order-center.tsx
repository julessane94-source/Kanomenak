"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, ClipboardList, PackageCheck, Search, Truck } from "lucide-react";

const initialOrders = [
  { code: "KMK-0001", status: "Assignee", risk: "Normal", courier: "Moussa Livraison", note: "Livraison standard" },
  { code: "KMK-0007", status: "En transit", risk: "Normal", courier: "Fatou Express", note: "Depart confirme" },
  { code: "KMK-0012", status: "A verifier", risk: "Litige", courier: "Non assigne", note: "Client demande verification" }
];

export function AdminOrderCenter() {
  const [orders, setOrders] = useState(initialOrders);
  const [selected, setSelected] = useState(initialOrders[0]);
  const [query, setQuery] = useState("");
  const [activity, setActivity] = useState(["Console commandes prete."]);
  const visibleOrders = orders.filter((order) => order.code.toLowerCase().includes(query.toLowerCase()) || order.status.toLowerCase().includes(query.toLowerCase()) || order.risk.toLowerCase().includes(query.toLowerCase()));
  function updateOrder(code: string, patch: Partial<(typeof initialOrders)[number]>, message: string) {
    setOrders((current) => current.map((item) => item.code === code ? { ...item, ...patch } : item));
    setSelected((current) => current.code === code ? { ...current, ...patch } : current);
    setActivity((current) => [message, ...current].slice(0, 5));
  }
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><PackageCheck className="size-7 text-emerald-700" /> Supervision commandes</h1>
            <p className="mt-1 text-sm font-semibold text-slate-600">Validation, reassignment livreur et gestion des litiges.</p>
          </div>
          <label className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
            <Search className="size-4 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filtrer" className="w-full outline-none" />
          </label>
        </div>
        <div className="mt-6 grid gap-4">{visibleOrders.map((order) => (
          <article key={order.code} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <button type="button" onClick={() => setSelected(order)} className="text-left">
                <h2 className="font-black">{order.code}</h2>
                <p className="text-sm font-semibold text-slate-500">{order.status} · {order.risk} · {order.courier}</p>
              </button>
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={order.status === "Validee"} onClick={() => updateOrder(order.code, { status: "Validee", risk: "Normal", note: "Commande validee par admin" }, order.code + " validee.")} className="flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white disabled:cursor-not-allowed disabled:bg-emerald-300"><CheckCircle className="size-4" /> {order.status === "Validee" ? "Validee" : "Valider"}</button>
                <button type="button" onClick={() => updateOrder(order.code, { status: "Livreur reassigne", courier: "Equipe dispatch", note: "Nouveau livreur demande" }, order.code + " reassignee au dispatch.")} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-black text-slate-700 hover:bg-slate-50"><Truck className="size-4" /> Reassigner</button>
                <button type="button" onClick={() => updateOrder(order.code, { risk: "Litige ouvert", note: "Ticket litige cree pour controle admin" }, "Litige ouvert sur " + order.code + ".")} className="flex h-11 items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 font-black text-amber-800 hover:bg-amber-100"><AlertTriangle className="size-4" /> Litige</button>
              </div>
            </div>
          </article>
        ))}</div>
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><ClipboardList className="size-5 text-emerald-700" /> Dossier commande</h2>
        <div className="mt-4 rounded-md bg-slate-50 p-4">
          <strong>{selected.code}</strong>
          <p className="mt-1 text-sm font-semibold text-slate-600">{selected.status} · {selected.risk}</p>
          <p className="mt-1 text-sm text-slate-600">Livreur : {selected.courier}</p>
          <p className="mt-3 rounded-md bg-white p-3 text-sm font-bold text-slate-700">{selected.note}</p>
        </div>
        <h3 className="mt-5 text-sm font-black uppercase text-slate-500">Journal</h3>
        <div className="mt-3 grid gap-2">{activity.map((item) => <p key={item} className="rounded-md bg-emerald-50 p-2 text-xs font-bold text-emerald-800">{item}</p>)}</div>
      </aside>
    </main>
  );
}
