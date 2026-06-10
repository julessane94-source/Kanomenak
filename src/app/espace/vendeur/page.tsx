import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { ActionTile } from "@/components/dashboard/action-tile";
import { StatusBoard } from "@/components/dashboard/status-board";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { sellerKpis, products } from "@/lib/data";
import { AlertTriangle, Bell, ClipboardList, Megaphone, PackagePlus, Settings, Star, Store, UserCircle, Wallet } from "lucide-react";

export default function SellerDashboard() {
  return (
    <DashboardShell title="Tableau de bord vendeur" subtitle="Boutique, catalogue, commandes, revenus, avis, visibilite et securite du compte.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{sellerKpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}</div>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Actions vendeur</h2>
            <p className="text-sm font-semibold text-slate-600">Boutons dedies a la gestion de boutique.</p>
          </div>
          <Link href="/espace/vendeur/produits" className="inline-flex w-full items-center justify-center rounded-md bg-emerald-800 px-4 py-3 text-sm font-black text-white sm:w-auto">Ajouter un produit</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ActionTile href="/espace/vendeur/produits" label="Ajouter produit" description="Publier un article avec image, prix, stock et categorie." icon={PackagePlus} />
          <ActionTile href="/espace/vendeur/commandes" label="Commandes" description="Confirmer, preparer et suivre les commandes clients." icon={ClipboardList} tone="light" />
          <ActionTile href="/espace/vendeur/revenus" label="Revenus" description="Consulter ventes, commissions et retraits." icon={Wallet} tone="light" />
          <ActionTile href="/espace/vendeur/produits" label="Booster produit" description="Mettre en avant un article performant." icon={Megaphone} tone="light" />
          <ActionTile href="/parametres/securite" label="Mot de passe" description="Modifier vos acces et renforcer la securite." icon={Settings} tone="light" />
          <ActionTile href="/signalement" label="Signaler erreur" description="Declarer un souci de commande, produit ou paiement." icon={AlertTriangle} tone="light" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <SimpleChart />
        <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Store className="size-5 text-emerald-700" /> Etat boutique</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="rounded-md bg-emerald-50 p-3 font-semibold text-emerald-800">Boutique active et visible sur le marche.</div>
            <div className="rounded-md bg-slate-50 p-3 text-slate-700">Score de recommandation moyen : 86%.</div>
            <div className="rounded-md bg-slate-50 p-3 text-slate-700">5 commandes attendent confirmation.</div>
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <StatusBoard title="Priorites vendeur" items={[
          { label: "Commandes a confirmer", value: "5", tone: "amber" },
          { label: "Produits a recharger", value: "3", tone: "blue" },
          { label: "Avis sans reponse", value: "7", tone: "amber" }
        ]} />
        <NotificationCenter role="VENDEUR" />
        <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-black text-slate-950">Produits populaires</h2>
          <div className="mt-4 grid gap-3">{products.slice(0, 4).map((p) => <div key={p.id} className="grid gap-2 rounded-md bg-slate-50 p-3 sm:grid-cols-[1fr_auto_auto]"><span className="font-semibold">{p.name}</span><span>{p.sales} ventes</span><strong className="text-emerald-700">{p.score}% visibilite</strong></div>)}</div>
        </section>
        <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Bell className="size-5 text-emerald-700" /> Alertes</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p className="rounded-md bg-amber-50 p-3">5 commandes attendent confirmation.</p>
            <p className="rounded-md bg-emerald-50 p-3">Votre note moyenne <Star className="inline size-4 fill-amber-400 text-amber-500" /> progresse.</p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
