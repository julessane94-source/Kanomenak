import Link from "next/link";
import { ArrowRight, BadgeCheck, MapPin, Search, Star } from "lucide-react";
import { partners, products } from "@/lib/data";

type PartnerType = "Pharmacies" | "Boulangeries";

export function PartnerDirectory({ type }: { type: PartnerType }) {
  const list = partners.filter((partner) => partner.type === type);
  const title = type;
  const baseHref = type === "Pharmacies" ? "/pharmacies" : "/boulangeries";
  const accent = type === "Pharmacies" ? "from-emerald-950 via-teal-900 to-cyan-800" : "from-amber-950 via-orange-800 to-emerald-800";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className={`overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${accent} text-white shadow-2xl shadow-emerald-950/15`}>
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_320px] md:p-9 md:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-black uppercase text-white"><BadgeCheck className="size-4" /> Enroles par l'admin</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-white/85">{list.length} etablissements verifies, produits consultables et commande directe.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <Search className="size-5 text-emerald-100" />
              <div>
                <p className="text-xs font-black uppercase text-white/70">Selection rapide</p>
                <p className="text-lg font-black">{products.filter((product) => product.category === type).length} produits actifs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((partner) => {
          const count = products.filter((product) => product.seller === partner.name).length;
          return (
            <Link key={partner.slug} href={`${baseHref}/${partner.slug}`} className="group overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl shadow-emerald-950/5 ring-1 ring-emerald-900/5 transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative">
                <img src={partner.image} alt={partner.name} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-emerald-800 shadow-sm">Verifie</span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">{partner.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-500"><MapPin className="size-4" /> {partner.city}</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-950 text-white shadow-sm group-hover:bg-teal-700"><ArrowRight className="size-4" /></span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{partner.description}</p>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm font-black">
                  <span>{count} produit(s)</span>
                  <span className="flex items-center gap-1 text-amber-600"><Star className="size-4 fill-amber-400" /> {partner.rating}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
