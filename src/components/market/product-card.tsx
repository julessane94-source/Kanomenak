import Link from "next/link";
import { MapPin, Star, TrendingUp } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { ProductActions } from "@/components/market/product-actions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-xl shadow-emerald-950/6 ring-1 ring-white/80 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-2xl hover:shadow-emerald-950/12">
      <Link href={`/produit/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-emerald-950">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-emerald-950/80 via-emerald-950/25 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-emerald-900 shadow-sm backdrop-blur">{product.badge}</span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-emerald-950/85 px-3 py-1 text-xs font-black text-white ring-1 ring-white/10 backdrop-blur"><TrendingUp className="size-3 text-amber-300" /> {product.sales} ventes</span>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-black uppercase text-teal-700">{product.category}</p>
          <h3 className="mt-1 min-h-12 text-base font-black leading-6 text-slate-950">{product.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-500"><MapPin className="size-3.5" /> {product.seller} · {product.city}</p>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 px-3 py-2 ring-1 ring-emerald-100/80">
          <strong className="text-lg text-emerald-900">{formatPrice(product.price)}</strong>
          <span className="flex items-center gap-1 rounded-full bg-white px-2 py-1 text-sm font-black text-amber-700 shadow-sm"><Star className="size-4 fill-amber-400" />{product.rating}</span>
        </div>
        <ProductActions product={product} />
      </div>
    </article>
  );
}
