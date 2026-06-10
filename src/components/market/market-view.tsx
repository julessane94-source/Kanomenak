"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles, Truck } from "lucide-react";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/market/product-card";

const visibleCategories = ["Alimentation", "Fruits et legumes", "Viande et poisson", "Electronique", "Telephones", "Informatique", "Habillement", "Chaussures"];

export function MarketView() {
  const [category, setCategory] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryOk = category === "Tous" || product.category === category;
      const queryOk = !query || product.name.toLowerCase().includes(query.toLowerCase()) || product.seller.toLowerCase().includes(query.toLowerCase()) || product.city.toLowerCase().includes(query.toLowerCase());
      return categoryOk && queryOk;
    });
  }, [category, query]);

  return (
    <main>
      <section className="border-b border-emerald-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700"><Sparkles className="size-4" /> Marketplace locale</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">kanomenak</h1>
            <p className="mt-4 max-w-xl text-lg font-semibold text-slate-600">Produits locaux, vendeurs verifies, livraison suivie.</p>
            <div className="mt-6 flex max-w-2xl items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
              <Search className="ml-2 size-5 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-3 outline-none" placeholder="Rechercher un produit, une boutique ou une ville" />
              <button type="button" className="grid size-11 place-items-center rounded-md bg-emerald-700 text-white" title="Filtres"><SlidersHorizontal className="size-5" /></button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {products.slice(0, 2).map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Marche</h2>
            <p className="text-sm font-bold text-slate-600">{category}</p>
          </div>
          <Link href="/espace/client/commandes" className="hidden items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm hover:bg-emerald-50 md:flex"><Truck className="size-4" /> Livraison suivie</Link>
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button type="button" onClick={() => setCategory("Tous")} className={`shrink-0 rounded-md border px-3 py-2 text-sm font-black ${category === "Tous" ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}>Tous</button>
          {visibleCategories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-md border px-3 py-2 text-sm font-black ${category === item ? "border-emerald-700 bg-emerald-700 text-white" : "border-slate-200 bg-white text-slate-700"}`}>{item}</button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} />) : <div className="rounded-lg border border-emerald-100 bg-white p-6 font-bold text-slate-700">Aucun produit trouve pour ce filtre.</div>}
        </div>
      </section>
    </main>
  );
}
