import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { ProductActions } from "@/components/market/product-actions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm shadow-emerald-950/5 ring-1 ring-white/70 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-950/10">
      <Link href={`/produit/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm backdrop-blur">{product.badge}</span>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-black uppercase text-emerald-700">{product.category} · {product.city}</p>
          <h3 className="mt-1 text-base font-bold text-slate-950">{product.name}</h3>
          <p className="text-sm text-slate-600">{product.seller}</p>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-lg text-emerald-700">{formatPrice(product.price)}</strong>
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-600"><Star className="size-4 fill-amber-400" />{product.rating}</span>
        </div>
        <ProductActions product={product} />
      </div>
    </article>
  );
}
