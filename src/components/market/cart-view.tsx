"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bell, CheckCircle, Download, Send, ShoppingBag, Trash2 } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { AvailableCouriersPanel } from "@/components/couriers/available-couriers-panel";

const paymentLabels = {
  WAVE: "Wave",
  ORANGE_MONEY: "Orange Money",
  CASH_ON_DELIVERY: "Paiement a la livraison"
};

function notifySellerOrder(seller: string, body: string) {
  const key = "kanomenak-seller-notifications";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  const notice = {
    id: String(Date.now()) + seller,
    seller,
    title: "Nouvelle commande",
    body,
    type: "commande",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify([notice, ...current].slice(0, 30)));
  window.dispatchEvent(new CustomEvent("kanomenak-seller-notification"));
}

export function CartView() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartKey, setCartKey] = useState("kanomenak-cart-anonymous");
  const [authenticated, setAuthenticated] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<keyof typeof paymentLabels>("WAVE");
  const [address, setAddress] = useState("Dakar");
  const [orderMessage, setOrderMessage] = useState("");
  const [vendorNotifications, setVendorNotifications] = useState<string[]>([]);

  useEffect(() => {
    let activeKey = "kanomenak-cart-anonymous";
    const read = (key: string) => {
      try {
        return JSON.parse(localStorage.getItem(key) || "[]") as Product[];
      } catch {
        return [];
      }
    };
    const mergeUnique = (items: Product[]) => items.filter((product, index, list) => list.findIndex((item) => item.id === product.id) === index);
    const load = (key = activeKey) => {
      const merged = mergeUnique([...read(key), ...read("kanomenak-cart"), ...read("kanomenak-cart-anonymous")]);
      if (merged.length) {
        localStorage.setItem(key, JSON.stringify(merged));
        localStorage.removeItem("kanomenak-cart");
        if (key !== "kanomenak-cart-anonymous") localStorage.removeItem("kanomenak-cart-anonymous");
      }
      setCart(merged);
    };
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data) => {
        activeKey = data.cartKey || "kanomenak-cart-anonymous";
        setCartKey(activeKey);
        setAuthenticated(Boolean(data.authenticated));
        load(activeKey);
      })
      .catch(() => {
        setAuthenticated(false);
        load(activeKey);
      });
    const onStorage = (event: Event) => {
      const detailKey = event instanceof CustomEvent ? event.detail?.key : null;
      if (!detailKey || detailKey === activeKey) load(activeKey);
    };
    window.addEventListener("kanomenak-storage", onStorage);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("kanomenak-storage", onStorage);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const total = useMemo(() => cart.reduce((sum, product) => sum + product.price, 0), [cart]);
  const deliveryFee = cart.length ? 1500 : 0;
  const sellers = useMemo(() => {
    const groups = new Map<string, Product[]>();
    for (const product of cart) {
      groups.set(product.seller, [...(groups.get(product.seller) || []), product]);
    }
    return Array.from(groups.entries()).map(([seller, products]) => ({
      seller,
      products,
      subtotal: products.reduce((sum, product) => sum + product.price, 0)
    }));
  }, [cart]);

  function remove(id: string) {
    const next = cart.filter((product) => product.id !== id);
    setCart(next);
    localStorage.setItem(cartKey, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("kanomenak-storage", { detail: { key: cartKey } }));
  }

  function downloadInvoice() {
    const lines = [
      "FACTURE KANOMENAK",
      "Reference: KMK-" + Date.now().toString().slice(-6),
      "Date: " + new Date().toLocaleDateString("fr-FR"),
      "Paiement: " + paymentLabels[paymentMethod],
      "Adresse: " + address,
      "",
      ...sellers.flatMap((group) => [
        "Vendeur: " + group.seller,
        ...group.products.map((product) => `- ${product.name} | ${formatPrice(product.price)}`),
        "Sous-total vendeur: " + formatPrice(group.subtotal),
        ""
      ]),
      "Livraison: " + formatPrice(deliveryFee),
      "Total: " + formatPrice(total + deliveryFee)
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "facture-kanomenak.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function order() {
    if (!authenticated) {
      setLoginPrompt(true);
      return;
    }
    if (!cart.length) {
      setOrderMessage("Votre panier est vide.");
      return;
    }
    setLoginPrompt(false);
    const payload = {
      clientId: "current-client",
      items: cart.map((product) => ({ productId: product.id, quantity: 1, seller: product.seller, price: product.price })),
      paymentMethod,
      address
    };
    const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) {
      setOrderMessage("Impossible de creer la commande.");
      return;
    }
    const notices = sellers.map((group) => `Notification envoyee a ${group.seller} pour ${group.products.length} produit(s).`);
    sellers.forEach((group) => notifySellerOrder(group.seller, `Commande ${data.code} : ${group.products.length} produit(s) a preparer.`));
    setVendorNotifications(notices);
    setOrderMessage(`Commande ${data.code} creee. Paiement ${paymentLabels[paymentMethod]} a valider pour ${formatPrice(total + deliveryFee)}.`);
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
      <section>
        <h1 className="text-3xl font-black text-slate-950">Panier</h1>
        <p className="mt-2 text-slate-700">Votre panier est personnel sur ce compte et ce navigateur.</p>
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

        {sellers.length > 0 && (
          <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-black text-slate-950"><Bell className="size-5 text-emerald-700" /> Vendeurs concernes</h2>
            <div className="mt-4 grid gap-3">
              {sellers.map((group) => (
                <div key={group.seller} className="rounded-md bg-slate-50 p-3">
                  <div className="flex justify-between gap-3"><strong>{group.seller}</strong><span className="font-black text-emerald-700">{formatPrice(group.subtotal)}</span></div>
                  <p className="mt-1 text-sm text-slate-600">{group.products.length} produit(s). Une notification sera envoyee apres validation.</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Validation commande</h2>
        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">Adresse de livraison<input value={address} onChange={(event) => setAddress(event.target.value)} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
        <label className="mt-4 grid gap-2 text-sm font-bold text-slate-700">Paiement<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as keyof typeof paymentLabels)} className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option value="WAVE">Wave</option><option value="ORANGE_MONEY">Orange Money</option><option value="CASH_ON_DELIVERY">Paiement a la livraison</option></select></label>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between"><span>Total produits</span><strong>{formatPrice(total)}</strong></div>
          <div className="flex justify-between"><span>Livraison estimee</span><strong>{formatPrice(deliveryFee)}</strong></div>
          <div className="flex justify-between"><span>Vendeurs</span><strong>{sellers.length}</strong></div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base"><span>Total a payer</span><strong>{formatPrice(total + deliveryFee)}</strong></div>
        </div>
        <button type="button" onClick={order} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 font-black text-white shadow-sm shadow-emerald-900/20 hover:bg-emerald-900"><ShoppingBag className="size-4" /> Valider et notifier</button>
        {loginPrompt && (
          <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm font-bold text-amber-900">
            Connectez-vous pour commander. <Link href="/connexion?next=/panier" className="underline">Se connecter</Link>
          </div>
        )}
        {orderMessage && <p className="mt-3 rounded-md bg-emerald-50 p-3 text-sm font-black text-emerald-800"><CheckCircle className="inline size-4" /> {orderMessage}</p>}
        {vendorNotifications.length > 0 && <div className="mt-3 grid gap-2">{vendorNotifications.map((notice) => <p key={notice} className="rounded-md bg-sky-50 p-2 text-xs font-bold text-sky-800"><Send className="inline size-3" /> {notice}</p>)}</div>}
        <button type="button" onClick={downloadInvoice} disabled={!cart.length} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-emerald-200 bg-white font-black text-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"><Download className="size-4" /> Telecharger facture</button>
        {cart.length > 0 && <div className="mt-4"><AvailableCouriersPanel compact title="Suggestions livreur" city={address} /></div>}
      </aside>
    </main>
  );
}
