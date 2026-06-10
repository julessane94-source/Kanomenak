import Link from "next/link";
import { ArrowLeft, BadgeCheck, Star, Truck } from "lucide-react";
import { formatPrice, getComparableOffers, products } from "@/lib/data";
import { ProductActions } from "@/components/market/product-actions";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id) || products[0];
  const offers = getComparableOffers(product);
  const best = offers[0];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm"><ArrowLeft className="size-4" /> Retour</Link>
      <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-950/10">
          <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase text-emerald-700">{product.category} · {product.city}</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">{product.name}</h1>
          <p className="mt-3 text-slate-600">{product.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs font-black uppercase text-emerald-700">Meilleur prix</p><strong className="text-xl text-slate-950">{formatPrice(best.price)}</strong></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-500">Note</p><strong className="flex items-center gap-1 text-xl text-slate-950"><Star className="size-4 fill-amber-400 text-amber-500" /> {product.rating}</strong></div>
            <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-500">Livraison</p><strong className="flex items-center gap-1 text-xl text-slate-950"><Truck className="size-4 text-emerald-700" /> Suivie</strong></div>
          </div>
          <div className="mt-5">
            <ProductActions product={product} />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black text-slate-950">Comparer les vendeurs</h2>
        <div className="mt-4 grid gap-3">
          {offers.map((offer, index) => (
            <article key={offer.seller} className="grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto_auto_auto] md:items-center">
              <div>
                <h3 className="flex items-center gap-2 font-black text-slate-950">{offer.seller}{index === 0 && <BadgeCheck className="size-4 text-emerald-700" />}</h3>
                <p className="text-sm font-semibold text-slate-500">{offer.city} · livraison {offer.delivery}</p>
              </div>
              <span className="font-bold text-amber-600">★ {offer.rating.toFixed(1)}</span>
              <strong className="text-xl text-emerald-800">{formatPrice(offer.price)}</strong>
              <Link href="/panier" className="rounded-xl bg-emerald-800 px-4 py-2 text-center text-sm font-black text-white">Choisir</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
