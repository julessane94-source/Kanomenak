import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { ActionTile } from "@/components/dashboard/action-tile";
import { StatusBoard } from "@/components/dashboard/status-board";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { getAdminKpis, getPlatformStats, products, orders, formatPrice } from "@/lib/data";
import { AlertTriangle, Bike, CreditCard, Flag, PackageCheck, Plus, Shield, Store, Tags, Users, WalletCards } from "lucide-react";

export default function AdminDashboard() {
  const stats = getPlatformStats();
  const queues = [
    { label: "Vendeurs actifs", value: String(stats.sellers), icon: Store },
    { label: "Livreurs actifs", value: String(stats.couriers), icon: Bike },
    { label: "Paiements commandes", value: String(orders.length), icon: CreditCard },
    { label: "Signalements ouverts", value: "3", icon: Flag }
  ];

  return (
    <DashboardShell title="Administration Nafaa" subtitle="Vue operationnelle basee sur les donnees actuellement presentes dans la plateforme.">
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {getAdminKpis().map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-black text-slate-950">Pilotage rapide</h2>
              <p className="text-sm font-semibold text-slate-500">Actions principales classees par priorite admin.</p>
            </div>
            <Link href="/espace/admin/utilisateurs" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-800 px-4 text-sm font-black text-white hover:bg-emerald-900"><Plus className="size-4" /> Nouvel utilisateur</Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <ActionTile href="/espace/admin/utilisateurs" label="Utilisateurs" description="Creer vendeur ou livreur, suspendre, reset mot de passe." icon={Users} />
            <ActionTile href="/espace/admin/commandes" label="Commandes" description="Valider, reassigner livreur et ouvrir litige." icon={PackageCheck} tone="light" />
            <ActionTile href="/espace/admin/paiements" label="Paiements" description="Valider, recontroler et exporter les paiements." icon={CreditCard} tone="light" />
            <ActionTile href="/espace/admin/signalements" label="Signalements" description="Traiter, resoudre et cloturer les tickets." icon={AlertTriangle} tone="light" />
            <ActionTile href="/categories" label="Categories" description="Organiser les rayons visibles du marche." icon={Tags} tone="light" />
            <ActionTile href="/espace/admin/paiements" label="Commissions" description="Suivre chiffre d'affaires et reversements." icon={WalletCards} tone="light" />
          </div>
        </div>

        <aside className="grid gap-4">
          <StatusBoard title="Vrais compteurs" items={[
            { label: "Produits catalogue", value: String(stats.products), tone: "green" },
            { label: "Ventes produits", value: String(stats.totalSales), tone: "blue" },
            { label: "CA calcule", value: formatPrice(stats.revenue), tone: "green" }
          ]} />
          <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5">
            <h2 className="text-lg font-black text-slate-950">Files de supervision</h2>
            <div className="mt-4 grid gap-3">
              {queues.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-md bg-slate-50 p-3">
                  <span className="flex items-center gap-2 text-sm font-semibold text-slate-700"><item.icon className="size-4 text-emerald-700" /> {item.label}</span>
                  <strong className="text-slate-950">{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <SimpleChart />
        <NotificationCenter role="ADMIN" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Shield className="size-5 text-emerald-700" /> Regles comptes</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <p className="rounded-md bg-slate-50 p-3">Les clients creent leur compte depuis S'inscrire avec email, Google ou telephone.</p>
            <p className="rounded-md bg-slate-50 p-3">Les vendeurs et livreurs sont crees uniquement par l'admin.</p>
            <p className="rounded-md bg-slate-50 p-3">Chaque utilisateur garde son panier et ses commandes dans son propre espace.</p>
          </div>
        </section>
        <section className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm shadow-emerald-950/5">
          <h2 className="text-lg font-black text-slate-950">Top produits reels</h2>
          <div className="mt-4 grid gap-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="grid gap-2 rounded-md bg-slate-50 p-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <span className="font-bold text-slate-900">{p.name}</span>
                <span className="text-sm font-semibold text-slate-600">{p.sales} ventes</span>
                <strong className="text-emerald-700">{formatPrice(p.sales * p.price)}</strong>
              </div>
            ))}
          </div>
        </section>
      </section>
    </DashboardShell>
  );
}
