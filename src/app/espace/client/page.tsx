import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ActionTile } from "@/components/dashboard/action-tile";
import { StatusBoard } from "@/components/dashboard/status-board";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { ProductCard } from "@/components/market/product-card";
import { AvailableCouriersPanel } from "@/components/couriers/available-couriers-panel";
import { products } from "@/lib/data";
import { AlertTriangle, CreditCard, Heart, PackageCheck, Search, Settings, ShoppingBasket, Star, Truck, UserCircle } from "lucide-react";

export default function ClientDashboard() {
  return (
    <DashboardShell title="Espace client" subtitle="Commandes, suivi, favoris, panier, paiements, profil, securite et recommandations personnalisees.">
      <div className="grid gap-4 md:grid-cols-4">
        {[{ label: "Commandes", value: "2 en cours", icon: PackageCheck }, { label: "Favoris", value: "8 produits", icon: Heart }, { label: "Paiements", value: "3 methodes", icon: CreditCard }, { label: "Avis", value: "12 publies", icon: Star }].map((item) => (
          <div key={item.label} className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"><item.icon className="size-5 text-emerald-700" /><p className="mt-3 text-sm font-semibold text-slate-500">{item.label}</p><strong className="text-xl text-slate-950">{item.value}</strong></div>
        ))}
      </div>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Actions client</h2>
            <p className="text-sm font-semibold text-slate-600">Boutons pour acheter, suivre et payer rapidement.</p>
          </div>
          <Link href="/" className="inline-flex w-full items-center justify-center rounded-md bg-emerald-800 px-4 py-3 text-sm font-black text-white sm:w-auto">Retour au marche</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ActionTile href="/" label="Rechercher" description="Trouver produits, boutiques et categories." icon={Search} tone="light" />
          <ActionTile href="/panier" label="Voir panier" description="Verifier les produits avant facturation." icon={ShoppingBasket} />
          <ActionTile href="/espace/client/commandes" label="Suivre commandes" description="Voir statut, livraison et historique." icon={Truck} tone="light" />
          <ActionTile href="/espace/client/paiements" label="Paiements" description="Gerer Wave, Orange Money et paiement livraison." icon={CreditCard} tone="light" />
          <ActionTile href="/parametres/securite" label="Mot de passe" description="Modifier vos acces de connexion." icon={Settings} tone="light" />
          <ActionTile href="/signalement" label="Signaler erreur" description="Declarer un souci d'achat ou de livraison." icon={AlertTriangle} tone="light" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <section>
          <h2 className="text-xl font-black text-slate-950">Recommandes pour vous</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
        <aside className="grid h-fit gap-4">
          <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">Compte client</h2>
            <p className="mt-2 text-sm text-slate-600">Connexion par email, Google ou telephone. Mot de passe modifiable a tout moment.</p>
            <Link href="/parametres/securite" className="mt-4 flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-3 font-bold text-slate-700">Modifier mot de passe</Link>
          </div>
          <AvailableCouriersPanel compact title="Livreurs disponibles" />
        </aside>
      </div>
      <div className="mt-6">
        <StatusBoard title="Suivi client" items={[{ label: "Commande en livraison", value: "KMK-0001", tone: "blue" }, { label: "Paiement prefere", value: "Wave", tone: "green" }, { label: "Produits favoris", value: "8", tone: "amber" }]} />
      </div>
      <div className="mt-6">
        <NotificationCenter role="CLIENT" />
      </div>
    </DashboardShell>
  );
}
