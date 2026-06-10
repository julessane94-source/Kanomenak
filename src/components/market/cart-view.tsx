"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, ShoppingBag, Trash2 } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";

export function CartView() {
  const [cart, setCart] = useState<Product[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  useEffect(() => {
    const load = () => setCart(JSON.parse(localStorage.getItem("kanomenak-cart") || "[]"));
    load();
    fetch("/api/auth/session").then((response) => response.json()).then((data) => setAuthenticated(Boolean(data.authenticated))).catch(() => setAuthenticated(false));
    window.addEventListener("kanomenak-storage", load);
    return () => window.removeEventListener("kanomenak-storage", load);
  }, []);

  const total = useMemo(() => cart.reduce((sum, product) => sum + product.price, 0), [cart]);

  function remove(id: string) {
    const next = cart.filter((product) => product.id !== id);
    setCart(next);
    localStorage.setItem("kanomenak-cart", JSON.stringify(next));
  }

  function downloadInvoice() {
    const lines = [
      "FACTURE KANOMENAK",
      "Reference: KMK-" + Date.now().toString().slice(-6),
      "Date: " + new Date().toLocaleDateString("fr-FR"),
      "",
      ...cart.map((product) => `- ${product.name} | ${product.seller} | ${formatPrice(product.price)}`),
      "",
      "Livraison: " + (cart.length ? formatPrice(1500) : formatPrice(0)),
      "Total: " + formatPrice(cart.length ? total + 1500 : 0)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facture-kanomenak.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function order() {
    if (!authenticated) {
      setLoginPrompt(true);
      return;
    }
    setLoginPrompt(false);
    alert("Commande creee avec succes.");
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <section>
        <h1 className="text-3xl font-black text-slate-950">Panier</h1>
        <p className="mt-2 text-slate-700">Les produits ajoutes depuis le bouton Panier apparaissent ici.</p>
        <div className="mt-6 space-y-3">
          {cart.length === 0 && <div className="rounded-lg border border-emerald-100 bg-white p-6 font-bold text-slate-700">Votre panier est vide. Retournez au marche pour ajouter des produits.</div>}
          {cart.map((product) => (
            <article key={product.id} className="flex gap-4 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
              <img src={product.image} alt={product.name} className="size-24 rounded-md object-cover" />
              <div className="flex-1">
                <h2 className="font-bold text-slate-950">{product.name}</h2>
                <p className="text-sm text-slate-500">{product.seller} · {product.city}</p>
                <p className="mt-2 font-black text-emerald-700">{formatPrice(product.price)}</p>
              </div>
              <button type="button" onClick={() => remove(product.id)} className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-700"><Trash2 className="size-4" /></button>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Facturation</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between"><span>Total produits</span><strong>{formatPrice(total)}</strong></div>
          <div className="flex justify-between"><span>Livraison estimee</span><strong>{cart.length ? formatPrice(1500) : formatPrice(0)}</strong></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base"><span>Total</span><strong>{formatPrice(cart.length ? total + 1500 : 0)}</strong></div>
        </div>
        <button type="button" onClick={order} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 font-black text-white shadow-sm shadow-emerald-900/20 hover:bg-emerald-900"><ShoppingBag className="size-4" /> Commander</button>
        {loginPrompt && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-900">
            Connectez-vous pour commander. <Link href="/connexion?next=/panier" className="underline">Se connecter</Link>
          </div>
        )}
        <button type="button" onClick={downloadInvoice} disabled={!cart.length} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-emerald-200 bg-white font-black text-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><Download className="size-4" /> Telecharger facture</button>
        <p className="mt-3 text-xs text-slate-500">Paiement Wave, Orange Money ou paiement a la livraison.</p>
      </aside>
    </main>
  );
}
