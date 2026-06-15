import Link from "next/link";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { partners, products } from "@/lib/data";
import { ProductCard } from "@/components/market/product-card";

type PartnerType = "Pharmacies" | "Boulangeries";

export function PartnerProducts({ type, slug }: { type: PartnerType; slug: string }) {
  const partner = partners.find((item) => item.type === type && item.slug === slug) || partners.find((item) => item.type === type)!;
  const items = products.filter((product) => product.seller === partner.name);
  const backHref = type === "Pharmacies" ? "/pharmacies" : "/boulangeries";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Link href={backHref} className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm"><ArrowLeft className="size-4" /> Retour</Link>
      <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-950/10">
        <div className="grid lg:grid-cols-[420px_1fr]">
          <img src={partner.image} alt={partner.name} className="h-full min-h-72 w-full object-cover" />
          <div className="p-6 md:p-8">
            <p className="text-sm font-black uppercase text-emerald-700">{partner.type}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">{partner.name}</h1>
            <p className="mt-3 max-w-2xl text-slate-600">{partner.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-50 p-4"><p className="text-xs font-black uppercase text-emerald-700">Ville</p><strong className="flex items-center gap-1 text-slate-950"><MapPin className="size-4" /> {partner.city}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-500">Note</p><strong className="flex items-center gap-1 text-slate-950"><Star className="size-4 fill-amber-400 text-amber-500" /> {partner.rating}</strong></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-black uppercase text-slate-500">Produits</p><strong className="text-slate-950">{items.length}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-black text-slate-950">Produits disponibles</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
