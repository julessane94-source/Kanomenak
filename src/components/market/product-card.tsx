import { Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/data";
import { ProductActions } from "@/components/market/product-actions";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-xs font-bold text-emerald-700 shadow-sm">{product.badge}</span>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">{product.category} · {product.city}</p>
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
