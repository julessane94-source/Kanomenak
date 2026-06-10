"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, Send } from "lucide-react";

const categories = [
  ["BUG", "Bug technique"],
  ["PAIEMENT", "Paiement"],
  ["COMMANDE", "Commande"],
  ["LIVRAISON", "Livraison"],
  ["PRODUIT", "Produit"],
  ["COMPTE", "Compte"],
  ["AUTRE", "Autre"]
];

export function ReportForm() {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        description: form.get("description"),
        category: form.get("category"),
        priority: form.get("priority"),
        pageUrl: form.get("pageUrl"),
        reporterRole: form.get("reporterRole")
      })
    });
    const data = await response.json();
    setMessage(response.ok ? `Signalement envoye : ${data.id}` : "Impossible d'envoyer le signalement.");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4">
        <AlertTriangle className="mt-1 size-5 shrink-0 text-emerald-700" />
        <p className="text-sm font-semibold text-emerald-900">Decrivez clairement le probleme. L'equipe admin pourra classer, prioriser et suivre le signalement.</p>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-700">Titre du probleme<input name="title" required className="h-11 rounded-md border border-slate-200 px-3 outline-none" placeholder="Ex: paiement non confirme" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Categorie<select name="category" className="h-11 rounded-md border border-slate-200 px-3 outline-none">{categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Priorite<select name="priority" className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option value="NORMAL">Normale</option><option value="HIGH">Haute</option><option value="URGENT">Urgente</option><option value="LOW">Faible</option></select></label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Role<select name="reporterRole" className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option>CLIENT</option><option>VENDEUR</option><option>LIVREUR</option><option>ADMIN</option></select></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Page concernee<input name="pageUrl" className="h-11 rounded-md border border-slate-200 px-3 outline-none" placeholder="/panier ou /espace/client" /></label>
      </div>
      <label className="grid gap-2 text-sm font-bold text-slate-700">Description<textarea name="description" required rows={6} className="rounded-md border border-slate-200 p-3 outline-none" placeholder="Expliquez ce qui s'est passe, les etapes, et ce que vous attendiez." /></label>
      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm font-black text-emerald-800">{message}</p>}
      <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-800 font-black text-white hover:bg-emerald-900"><Send className="size-4" /> Envoyer le signalement</button>
    </form>
  );
}
