"use client";

import { useState } from "react";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "@/types";

function saveItem(key: string, product: Product) {
  const current = JSON.parse(localStorage.getItem(key) || "[]") as Product[];
  const exists = current.some((item) => item.id === product.id);
  const next = exists ? current : [...current, product];
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event("kanomenak-storage"));
}

export function ProductActions({ product }: { product: Product }) {
  const [status, setStatus] = useState("");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={() => {
          saveItem("kanomenak-cart", product);
          setStatus("Produit ajoute au panier");
        }}
        className="flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white hover:bg-emerald-800"
      >
        <ShoppingCart className="size-4" /> Panier
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => {
            saveItem("kanomenak-favorites", product);
            setStatus("Produit ajoute aux favoris");
          }}
          className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 font-black text-slate-700 hover:bg-emerald-50"
        >
          <Heart className="size-4" /> Favori
        </button>
        <button
          type="button"
          onClick={() => {
            setContactOpen((value) => !value);
            setStatus("Contact vendeur affiche");
          }}
          className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 font-black text-slate-700 hover:bg-emerald-50"
        >
          <MessageCircle className="size-4" /> Contact
        </button>
      </div>
      {status && <p className="rounded-md bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-800">{status}</p>}
      {contactOpen && (
        <div className="rounded-md border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-950">
          <p className="font-black">{product.seller}</p>
          <p>WhatsApp : +221 77 000 00 00</p>
          <p>Email : vendeur@kanomenak.com</p>
        </div>
      )}
    </div>
  );
}
