import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { partners, products } from "@/lib/data";

type PartnerType = "Pharmacies" | "Boulangeries";

export function PartnerDirectory({ type }: { type: PartnerType }) {
  const list = partners.filter((partner) => partner.type === type);
  const title = type;
  const baseHref = type === "Pharmacies" ? "/pharmacies" : "/boulangeries";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="rounded-2xl bg-emerald-950 p-6 text-white shadow-xl shadow-emerald-950/10 md:p-8">
        <p className="text-sm font-black uppercase text-emerald-200">Etablissements enroles</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm font-semibold text-emerald-50">Choisissez un etablissement, consultez ses produits et ajoutez-les au panier.</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((partner) => {
          const count = products.filter((product) => product.seller === partner.name).length;
          return (
            <Link key={partner.slug} href={`${baseHref}/${partner.slug}`} className="group overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm shadow-emerald-950/5 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
              <img src={partner.image} alt={partner.name} className="aspect-[16/9] w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">{partner.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-500"><MapPin className="size-4" /> {partner.city}</p>
                  </div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white"><ArrowRight className="size-4" /></span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{partner.description}</p>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-black">
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
