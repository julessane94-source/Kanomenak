"use client";

import { useState } from "react";
import { ImagePlus, Megaphone, PackagePlus, Pencil, Trash2 } from "lucide-react";
import { formatPrice, products } from "@/lib/data";

type ProductRow = { id: string; name: string; price: number; stock: number; city: string; boosted?: boolean };

export function SellerProductManager() {
  const [rows, setRows] = useState<ProductRow[]>(products.slice(0, 5).map((product, index) => ({ id: product.id, name: product.name, price: product.price, stock: 24 + index * 6, city: product.city })));
  const [form, setForm] = useState({ name: "", price: "", stock: "", city: "Dakar", category: "Alimentation" });
  const [message, setMessage] = useState("");

  function publish() {
    if (!form.name || !form.price) {
      setMessage("Ajoutez au moins le nom et le prix du produit.");
      return;
    }
    setRows((current) => [{ id: "local_" + Date.now(), name: form.name, price: Number(form.price), stock: Number(form.stock || 1), city: form.city }, ...current]);
    setForm({ name: "", price: "", stock: "", city: "Dakar", category: "Alimentation" });
    setMessage("Produit publie dans le catalogue vendeur.");
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
      <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="flex items-center gap-2 text-2xl font-black text-slate-950"><PackagePlus className="size-6 text-emerald-700" /> Ajouter produit</h1>
        <form action={publish} className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">Nom du produit<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Prix<input value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} type="number" className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Stock<input value={form.stock} onChange={(event) => setForm({ ...form, stock: event.target.value })} type="number" className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Ville<input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Categorie<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option>Alimentation</option><option>Electronique</option><option>Maison</option></select></label>
          <button type="submit" className="flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white hover:bg-emerald-800"><ImagePlus className="size-4" /> Publier avec image</button>
        </form>
        {message && <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{message}</p>}
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Catalogue boutique</h2>
        <div className="mt-4 grid gap-3">{rows.map((p) => (
          <div key={p.id} className="grid gap-3 rounded-md bg-slate-50 p-3 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div><span className="font-bold">{p.name}</span><p className="text-xs font-semibold text-slate-500">{p.city} · {p.stock} en stock</p></div>
            <span>{formatPrice(p.price)}</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setRows((current) => current.map((item) => item.id === p.id ? { ...item, boosted: !item.boosted } : item))} className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-black text-white"><Megaphone className="inline size-4" /> {p.boosted ? "Boost actif" : "Booster"}</button>
              <button type="button" onClick={() => setMessage("Edition ouverte pour " + p.name)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700"><Pencil className="inline size-4" /> Editer</button>
              <button type="button" onClick={() => setRows((current) => current.filter((item) => item.id !== p.id))} className="rounded-md border border-red-100 bg-white px-3 py-2 text-sm font-black text-red-700"><Trash2 className="inline size-4" /> Retirer</button>
            </div>
          </div>
        ))}</div>
      </section>
    </main>
  );
}
