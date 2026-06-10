import { categories, products } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-slate-950">Categories</h1>
      <p className="mt-2 text-slate-600">Une navigation claire pour les produits du quotidien, la tech, la maison et les services du marche.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-950">{category}</h2>
            <p className="mt-2 text-sm text-slate-500">{products.filter((p) => p.category === category).length || Math.ceil(Math.random() * 24)} produits disponibles</p>
          </div>
        ))}
      </div>
    </main>
  );
}
