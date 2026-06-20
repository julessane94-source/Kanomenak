"use client";

import { useState } from "react";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

async function scopedKey(kind: "cart" | "favorites") {
  try {
    const response = await fetch("/api/auth/session");
    const data = await response.json();
    return kind === "cart" ? data.cartKey || "Nafaa-cart-anonymous" : data.favoritesKey || "Nafaa-favorites-anonymous";
  } catch {
    return kind === "cart" ? "Nafaa-cart-anonymous" : "Nafaa-favorites-anonymous";
  }
}

function notifySeller(product: Product) {
  const key = "Nafaa-seller-notifications";
  const current = JSON.parse(localStorage.getItem(key) || "[]");
  const notice = {
    id: String(Date.now()) + product.id,
    seller: product.seller,
    title: "Produit selectionne",
    body: product.name + " vient d'etre ajoute au panier par un client.",
    type: "selection",
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(key, JSON.stringify([notice, ...current].slice(0, 30)));
  window.dispatchEvent(new CustomEvent("Nafaa-seller-notification"));
}

async function saveItem(kind: "cart" | "favorites", product: Product) {
  const key = await scopedKey(kind);
  const current = JSON.parse(localStorage.getItem(key) || "[]") as Product[];
  const exists = current.some((item) => item.id === product.id);
  const next = exists ? current : [...current, product];
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("Nafaa-storage", { detail: { key } }));
  if (kind === "cart" && !exists) notifySeller(product);
}

export function ProductActions({ product }: { product: Product }) {
  const [status, setStatus] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={async () => {
          await saveItem("cart", product);
          setStatus("Produit ajoute au panier. Vendeur notifie.");
        }}
        className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-emerald-800 to-teal-700 px-4 font-black text-white shadow-sm shadow-emerald-900/25 hover:-translate-y-0.5 hover:from-emerald-950 hover:to-teal-800"
      >
        <ShoppingCart className="size-4" /> Panier
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={async () => {
            await saveItem("favorites", product);
            setStatus("Produit ajoute a vos favoris");
          }}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          <Heart className="size-4" /> Favori
        </button>
        <button
          type="button"
          onClick={() => {
            const text = encodeURIComponent(`Bonjour, je suis interesse par le produit "${product.name}" sur Nafaa.`);
            window.open(`https://wa.me/221770000000?text=${text}`, "_blank", "noopener,noreferrer");
            setContactOpen(true);
            setStatus("WhatsApp ouvert");
          }}
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          <MessageCircle className="size-4" /> Contact
        </button>
      </div>
      {status && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">{status}</p>}
      {contactOpen && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-950">
          <p className="font-black">{product.seller}</p>
          <p>WhatsApp : +221 77 000 00 00</p>
          <p>Email : vendeur@nafaa.com</p>
        </div>
      )}
    </div>
  );
}
