"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { categories, products } from "@/lib/data";

const accents = ["from-emerald-700 to-teal-900", "from-lime-600 to-emerald-800", "from-cyan-700 to-emerald-900", "from-slate-700 to-emerald-900"];

export function CategoriesView() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => categories.filter((category) => category.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="overflow-hidden rounded-2xl bg-emerald-950 text-white shadow-xl shadow-emerald-950/10">
        <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-black text-emerald-100"><Sparkles className="size-4" /> Rayons Nafaa</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Categories</h1>
            <p className="mt-2 text-sm font-semibold text-emerald-50">Navigation rapide par rayon.</p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white p-2 text-slate-950">
            <Search className="ml-2 size-5 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-3 outline-none" placeholder="Rechercher une categorie" />
          </div>
        </div>
      </section>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((category, index) => {
          const count = products.filter((p) => p.category === category).length;
          return (
            <Link key={category} href={`/?categorie=${encodeURIComponent(category)}`} className="group overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm shadow-emerald-950/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10">
              <div className={`h-2 bg-gradient-to-r ${accents[index % accents.length]}`} />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black text-slate-950">{category}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{count} produit(s)</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-800 group-hover:text-white"><ArrowRight className="size-4" /></span>
                </div>
                <div className="mt-5 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-700" style={{ width: `${Math.min(100, count * 22)}%` }} /></div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
