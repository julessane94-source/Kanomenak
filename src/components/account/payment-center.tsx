"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, ShieldCheck, Smartphone, WalletCards } from "lucide-react";

const methods = [
  { id: "Wave", icon: Smartphone, detail: "+221 77 000 00 00" },
  { id: "Orange Money", icon: WalletCards, detail: "+221 78 000 11 22" },
  { id: "Paiement a la livraison", icon: CreditCard, detail: "Cash confirme a reception" }
];

export function ClientPaymentCenter() {
  const [selected, setSelected] = useState("Wave");
  const [message, setMessage] = useState("");
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><CreditCard className="size-7 text-emerald-700" /> Paiements client</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {methods.map((item) => (
          <button key={item.id} type="button" onClick={() => { setSelected(item.id); setMessage(item.id + " defini comme methode preferee."); }} className={`rounded-lg border p-5 text-left shadow-sm transition hover:-translate-y-1 ${selected === item.id ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
            <item.icon className="size-6 text-emerald-700" />
            <h2 className="mt-4 text-xl font-black">{item.id}</h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">{item.detail}</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-black text-emerald-800"><CheckCircle className="size-4" /> {selected === item.id ? "Selectionne" : "Selectionner"}</span>
          </button>
        ))}
      </div>
      <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><ShieldCheck className="size-5 text-emerald-700" /> Verification</h2>
        <p className="mt-2 text-sm font-semibold text-slate-600">{message || "Choisissez une methode pour vos prochaines commandes."}</p>
      </section>
    </main>
  );
}

export function AdminPaymentCenter() {
  const [items, setItems] = useState([
    { method: "Wave", count: 24, status: "Confirme" },
    { method: "Orange Money", count: 31, status: "A rapprocher" },
    { method: "Livraison", count: 18, status: "A encaisser" }
  ]);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><CreditCard className="size-7 text-emerald-700" /> Supervision paiements</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.method} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black">{item.method}</h2>
            <p className="mt-2 text-3xl font-black text-emerald-700">{item.count}</p>
            <p className="text-sm font-semibold text-slate-500">{item.status}</p>
            <button type="button" onClick={() => setItems((current) => current.map((entry) => entry.method === item.method ? { ...entry, status: "Valide" } : entry))} className="mt-4 w-full rounded-md bg-emerald-700 px-4 py-3 font-black text-white hover:bg-emerald-800">Valider</button>
          </article>
        ))}
      </div>
    </main>
  );
}
