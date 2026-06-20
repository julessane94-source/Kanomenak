"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/market/product-card";

export function FavoritesView() {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => setFavorites(JSON.parse(localStorage.getItem("Nafaa-favorites") || "[]"));
    load();
    window.addEventListener("Nafaa-storage", load);
    return () => window.removeEventListener("Nafaa-storage", load);
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-slate-950">Favoris</h1>
      <p className="mt-2 text-slate-700">Les produits ajoutes depuis le bouton Favori apparaissent ici.</p>
      {favorites.length === 0 ? (
        <div className="mt-6 rounded-lg border border-emerald-100 bg-white p-6 font-bold text-slate-700">Aucun favori pour le moment.</div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </main>
  );
}
