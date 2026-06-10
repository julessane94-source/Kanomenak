"use client";

import { useMemo, useState } from "react";
import { Bell, CheckCheck, PackageCheck, ShieldAlert, Truck, Wallet } from "lucide-react";

const notifications = [
  { id: "n1", title: "Commande confirmee", body: "KMK-0001 est en preparation.", role: "CLIENT", icon: PackageCheck, tone: "green" },
  { id: "n2", title: "Paiement a verifier", body: "Un paiement Orange Money attend validation.", role: "ADMIN", icon: Wallet, tone: "amber" },
  { id: "n3", title: "Mission disponible", body: "Nouvelle livraison proche de votre zone.", role: "LIVREUR", icon: Truck, tone: "blue" },
  { id: "n4", title: "Signalement ouvert", body: "Un client a signale un probleme produit.", role: "VENDEUR", icon: ShieldAlert, tone: "amber" }
];

export function NotificationCenter({ role = "CLIENT" }: { role?: "ADMIN" | "VENDEUR" | "LIVREUR" | "CLIENT" }) {
  const [read, setRead] = useState<string[]>([]);
  const items = useMemo(() => notifications.filter((item) => item.role === role || role === "ADMIN"), [role]);
  const unread = items.filter((item) => !read.includes(item.id)).length;

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Bell className="size-5 text-emerald-700" /> Notifications</h2>
          <p className="text-xs font-bold text-slate-500">{unread} non lue(s)</p>
        </div>
        <button type="button" onClick={() => setRead(items.map((item) => item.id))} className="flex items-center gap-2 rounded-xl border border-emerald-100 px-3 py-2 text-xs font-black text-emerald-800 hover:bg-emerald-50">
          <CheckCheck className="size-4" /> Tout lire
        </button>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <button key={item.id} type="button" onClick={() => setRead((current) => Array.from(new Set([...current, item.id])))} className={`flex items-start gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${read.includes(item.id) ? "border-slate-100 bg-slate-50 opacity-75" : "border-emerald-100 bg-emerald-50"}`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm"><item.icon className="size-4" /></span>
            <span>
              <strong className="block text-sm text-slate-950">{item.title}</strong>
              <span className="text-xs font-semibold text-slate-600">{item.body}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
