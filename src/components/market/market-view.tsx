"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BadgeCheck, Search, ShieldCheck, SlidersHorizontal, Sparkles, Truck } from "lucide-react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/market/product-card";

const visibleCategories = ["Alimentation", "Fruits et legumes", "Viande et poisson", "Electronique", "Telephones", "Informatique", "Pharmacies", "Boulangeries"];

export function MarketView() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categorie") || "Tous";
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => products.filter((product) => {
    const categoryOk = category === "Tous" || product.category === category;
    const queryOk = !query || product.name.toLowerCase().includes(query.toLowerCase()) || product.seller.toLowerCase().includes(query.toLowerCase()) || product.city.toLowerCase().includes(query.toLowerCase());
    return categoryOk && queryOk;
  }), [category, query]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-emerald-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/85 px-3 py-2 text-sm font-black text-emerald-700 shadow-sm"><Sparkles className="size-4" /> Marketplace locale</p>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">Nafaa</h1>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">Produits locaux, vendeurs verifies, livraison suivie.</p>
            <div className="mt-6 max-w-2xl rounded-2xl border border-emerald-100 bg-white p-2 shadow-xl shadow-emerald-950/10">
              <div className="flex items-center gap-2">
                <Search className="ml-2 size-5 shrink-0 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-3 outline-none" placeholder="Produit, boutique ou ville" />
                <button type="button" className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-800 text-white shadow-sm hover:bg-emerald-900" title="Filtres"><SlidersHorizontal className="size-5" /></button>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[{ icon: ShieldCheck, label: "Vendeurs verifies" }, { icon: Truck, label: "Livraison suivie" }, { icon: BadgeCheck, label: "Paiement clair" }].map((item) => (
                <div key={item.label} className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white/80 px-3 py-3 text-sm font-black text-slate-700 shadow-sm">
                  <item.icon className="size-4 text-emerald-700" /> {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Marche</h2>
            <p className="text-sm font-bold text-slate-600">{filtered.length} produit(s) · {category}</p>
          </div>
          <Link href="/espace/client/commandes" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-700 shadow-sm hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"><Truck className="size-4" /> Livraison suivie</Link>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
          <button type="button" onClick={() => setCategory("Tous")} className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-black shadow-sm ${category === "Tous" ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-100 bg-white text-slate-700 hover:bg-emerald-50"}`}>Tous</button>
          {visibleCategories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-black shadow-sm ${category === item ? "border-emerald-800 bg-emerald-800 text-white" : "border-emerald-100 bg-white text-slate-700 hover:bg-emerald-50"}`}>{item}</button>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="rounded-xl border border-emerald-100 bg-white p-6 font-bold text-slate-700">Aucun produit trouve pour ce filtre.</div>}
        </div>
      </section>
    </main>
  );
}
