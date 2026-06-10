import { products, formatPrice } from "@/lib/data";
import { ImagePlus, PackagePlus } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

export default function SellerProductsPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
      <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="flex items-center gap-2 text-2xl font-black text-slate-950"><PackagePlus className="size-6 text-emerald-700" /> Ajouter produit</h1>
        <form className="mt-5 grid gap-3">
          {["Nom du produit", "Prix", "Stock", "Ville"].map((label) => <label key={label} className="grid gap-2 text-sm font-bold text-slate-700">{label}<input className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>)}
          <label className="grid gap-2 text-sm font-bold text-slate-700">Categorie<select className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option>Alimentation</option><option>Electronique</option><option>Maison</option></select></label>
          <ActionButton label="Publier avec image" doneLabel="Produit publie" icon="ImagePlus" full />
        </form>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Catalogue boutique</h2>
        <div className="mt-4 grid gap-3">{products.map((p, index) => <div key={p.id} className="grid gap-2 rounded-md bg-slate-50 p-3 md:grid-cols-[1fr_auto_auto]"><span className="font-bold">{p.name}</span><span>{formatPrice(p.price)}</span><strong className="text-emerald-700">{24 + index * 6} en stock</strong></div>)}</div>
      </section>
    </main>
  );
}
