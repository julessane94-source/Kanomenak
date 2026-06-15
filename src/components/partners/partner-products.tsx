import Link from "next/link";
import { ArrowLeft, BadgeCheck, MapPin, ShoppingBasket, Star } from "lucide-react";
import { partners, products } from "@/lib/data";
import { ProductCard } from "@/components/market/product-card";

type PartnerType = "Pharmacies" | "Boulangeries";

export function PartnerProducts({ type, slug }: { type: PartnerType; slug: string }) {
  const partner = partners.find((item) => item.type === type && item.slug === slug) || partners.find((item) => item.type === type)!;
  const items = products.filter((product) => product.seller === partner.name);
  const backHref = type === "Pharmacies" ? "/pharmacies" : "/boulangeries";
  const accent = type === "Pharmacies" ? "from-emerald-950 via-teal-900 to-cyan-800" : "from-amber-950 via-orange-800 to-emerald-800";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Link href={backHref} className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm font-black text-emerald-900 shadow-sm hover:-translate-y-0.5"><ArrowLeft className="size-4" /> Retour</Link>
      <section className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/70 bg-white shadow-2xl shadow-emerald-950/10 ring-1 ring-emerald-900/5">
        <div className="grid lg:grid-cols-[460px_1fr]">
          <div className="relative min-h-80 overflow-hidden">
            <img src={partner.image} alt={partner.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-t ${accent} opacity-35`} />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 text-xs font-black text-emerald-900 shadow-sm"><BadgeCheck className="size-4" /> Verifie admin</span>
          </div>
          <div className="p-6 md:p-9">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">{partner.type}</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">{partner.name}</h1>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-slate-600">{partner.description}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100"><p className="text-xs font-black uppercase text-emerald-700">Ville</p><strong className="mt-1 flex items-center gap-1 text-slate-950"><MapPin className="size-4" /> {partner.city}</strong></div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><p className="text-xs font-black uppercase text-slate-500">Note</p><strong className="mt-1 flex items-center gap-1 text-slate-950"><Star className="size-4 fill-amber-400 text-amber-500" /> {partner.rating}</strong></div>
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><p className="text-xs font-black uppercase text-slate-500">Catalogue</p><strong className="mt-1 flex items-center gap-1 text-slate-950"><ShoppingBasket className="size-4" /> {items.length}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase text-emerald-700">Commande directe</p>
            <h2 className="text-2xl font-black text-slate-950">Produits disponibles</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-600 shadow-sm">{items.length} produit(s)</span>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
