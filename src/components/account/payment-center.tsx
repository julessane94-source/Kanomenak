"use client";

import { useState } from "react";
import { CheckCircle, Clock, CreditCard, Download, RefreshCcw, ShieldCheck, Smartphone, WalletCards } from "lucide-react";

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
    { method: "Wave", count: 24, amount: "1 240 000 FCFA", status: "A rapprocher", validatedAt: "" },
    { method: "Orange Money", count: 31, amount: "1 810 000 FCFA", status: "A verifier", validatedAt: "" },
    { method: "Livraison", count: 18, amount: "640 000 FCFA", status: "A encaisser", validatedAt: "" }
  ]);
  const [log, setLog] = useState("Selectionnez une action de controle.");
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><CreditCard className="size-7 text-emerald-700" /> Supervision paiements</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.method} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-black">{item.method}</h2>
                <p className="mt-2 text-3xl font-black text-emerald-700">{item.count}</p>
              </div>
              <span className={`rounded-md px-2 py-1 text-xs font-black ${item.status === "Valide" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{item.status}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-500">{item.amount}</p>
            {item.validatedAt && <p className="mt-2 text-xs font-bold text-emerald-700">Valide le {item.validatedAt}</p>}
            <div className="mt-4 grid gap-2">
              <button type="button" disabled={item.status === "Valide"} onClick={() => { const stamp = new Date().toLocaleString("fr-FR"); setItems((current) => current.map((entry) => entry.method === item.method ? { ...entry, status: "Valide", validatedAt: stamp } : entry)); setLog(item.method + " valide et ajoute au journal comptable."); }} className="flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"><CheckCircle className="size-4" /> {item.status === "Valide" ? "Deja valide" : "Valider"}</button>
              <button type="button" onClick={() => { setItems((current) => current.map((entry) => entry.method === item.method ? { ...entry, status: "A verifier", validatedAt: "" } : entry)); setLog("Controle relance pour " + item.method + "."); }} className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700 hover:bg-slate-50"><RefreshCcw className="size-4" /> Recontroler</button>
            </div>
          </article>
        ))}
      </div>
      <section className="mt-6 grid gap-4 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Clock className="size-5 text-emerald-700" /> Journal paiement</h2>
          <p className="mt-1 text-sm font-semibold text-slate-600">{log}</p>
        </div>
        <button type="button" onClick={() => setLog("Export comptable prepare pour les paiements visibles.")} className="flex h-11 items-center justify-center gap-2 rounded-md border border-emerald-200 px-4 font-black text-emerald-800 hover:bg-emerald-50"><Download className="size-4" /> Exporter</button>
      </section>
    </main>
  );
}
