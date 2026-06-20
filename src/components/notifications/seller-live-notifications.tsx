"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Bell, CheckCheck, PackageCheck, ShoppingBasket } from "lucide-react";

type SellerNotice = {
  id: string;
  seller: string;
  title: string;
  body: string;
  type: "selection" | "commande" | "stock";
  createdAt: string;
};

const storageKey = "Nafaa-seller-notifications";

function readNotices() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]") as SellerNotice[];
  } catch {
    return [];
  }
}

export function pushSellerNotification(notice: Omit<SellerNotice, "id" | "createdAt">) {
  const next = [{ ...notice, id: String(Date.now()) + Math.random().toString(16).slice(2), createdAt: new Date().toISOString() }, ...readNotices()].slice(0, 30);
  localStorage.setItem(storageKey, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("Nafaa-seller-notification"));
}

export function SellerLiveNotifications({ seller = "Awa Boutique", lowStock = [] }: { seller?: string; lowStock?: { name: string; stock: number }[] }) {
  const [items, setItems] = useState<SellerNotice[]>([]);
  const [read, setRead] = useState<string[]>([]);

  useEffect(() => {
    const load = () => setItems(readNotices());
    load();
    window.addEventListener("Nafaa-seller-notification", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("Nafaa-seller-notification", load);
      window.removeEventListener("storage", load);
    };
  }, []);

  const visible = useMemo(() => {
    const live = items.filter((item) => item.seller === seller || item.seller === "Tous les vendeurs");
    const stock = lowStock.map((product) => ({
      id: "stock-" + product.name,
      seller,
      title: "Stock faible",
      body: product.name + " arrive a " + product.stock + " article(s).",
      type: "stock" as const,
      createdAt: new Date().toISOString()
    }));
    return [...stock, ...live].slice(0, 6);
  }, [items, lowStock, seller]);

  const unread = visible.filter((item) => !read.includes(item.id)).length;

  return (
    <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-950/6 ring-1 ring-white/80">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Bell className="size-5 text-emerald-800" /> Notifications vendeur</h2>
          <p className="text-xs font-bold text-slate-500">{unread} alerte(s) a traiter</p>
        </div>
        <button type="button" onClick={() => setRead(visible.map((item) => item.id))} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-emerald-100 px-3 text-xs font-black text-emerald-900 hover:bg-emerald-50"><CheckCheck className="size-4" /> Tout lire</button>
      </div>
      <div className="mt-4 grid gap-3">
        {visible.length === 0 && <p className="rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-900">Aucune notification urgente.</p>}
        {visible.map((item) => {
          const Icon = item.type === "stock" ? AlertTriangle : item.type === "commande" ? PackageCheck : ShoppingBasket;
          const urgent = item.type === "stock";
          return (
            <button key={item.id} type="button" onClick={() => setRead((current) => Array.from(new Set([...current, item.id])))} className={`flex items-start gap-3 rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${read.includes(item.id) ? "border-slate-100 bg-slate-50 opacity-75" : urgent ? "border-amber-200 bg-amber-50" : "border-emerald-100 bg-emerald-50"}`}>
              <span className={`grid size-10 shrink-0 place-items-center rounded-xl bg-white shadow-sm ${urgent ? "text-amber-700" : "text-emerald-800"}`}><Icon className="size-4" /></span>
              <span>
                <strong className="block text-sm text-slate-950">{item.title}</strong>
                <span className="text-xs font-semibold text-slate-600">{item.body}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
