import Link from "next/link";
import { MapPin, Star, TrendingUp } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { ProductActions } from "@/components/market/product-actions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm shadow-emerald-950/5 ring-1 ring-white/70 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/10">
      <Link href={`/produit/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/55 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-emerald-700 shadow-sm backdrop-blur">{product.badge}</span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-black text-white backdrop-blur"><TrendingUp className="size-3" /> {product.sales} ventes</span>
      </Link>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-black uppercase text-emerald-700">{product.category}</p>
          <h3 className="mt-1 min-h-12 text-base font-black leading-6 text-slate-950">{product.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-500"><MapPin className="size-3.5" /> {product.seller} · {product.city}</p>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
          <strong className="text-lg text-emerald-700">{formatPrice(product.price)}</strong>
          <span className="flex items-center gap-1 text-sm font-black text-amber-600"><Star className="size-4 fill-amber-400" />{product.rating}</span>
        </div>
        <ProductActions product={product} />
      </div>
    </article>
  );
}
