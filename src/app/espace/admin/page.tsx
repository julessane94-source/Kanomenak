import Link from "next/link";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { SimpleChart } from "@/components/dashboard/simple-chart";
import { ActionTile } from "@/components/dashboard/action-tile";
import { StatusBoard } from "@/components/dashboard/status-board";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { adminKpis, products } from "@/lib/data";
import { AlertTriangle, Bike, CreditCard, Flag, PackageCheck, Plus, Shield, Store, Tags, UserCircle, Users, WalletCards } from "lucide-react";

const queues = [
  { label: "Vendeurs a verifier", value: "18", icon: Store },
  { label: "Livreurs en attente", value: "9", icon: Bike },
  { label: "Paiements a rapprocher", value: "27", icon: CreditCard },
  { label: "Signalements ouverts", value: "6", icon: Flag }
];

export default function AdminDashboard() {
  return (
    <DashboardShell title="Administration kanomenak" subtitle="Console centrale pour creer les comptes vendeurs/livreurs, superviser les commandes, controler les paiements et piloter la qualite marketplace.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{adminKpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}</div>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Actions admin</h2>
            <p className="text-sm font-semibold text-slate-600">Boutons reserves a l'administrateur.</p>
          </div>
          <Link href="/espace/admin/utilisateurs" className="hidden rounded-md bg-emerald-800 px-4 py-3 text-sm font-black text-white md:block">Nouvel utilisateur</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ActionTile href="/espace/admin/utilisateurs" label="Creer utilisateur" description="Ajouter vendeur ou livreur avec mot de passe temporaire." icon={Plus} />
          <ActionTile href="/espace/admin/commandes" label="Commandes" description="Superviser statuts, litiges et confirmations." icon={PackageCheck} tone="light" />
          <ActionTile href="/espace/admin/paiements" label="Paiements" description="Controler Wave, Orange Money et cash." icon={CreditCard} tone="light" />
          <ActionTile href="/categories" label="Categories" description="Organiser les rayons et filtres du marche." icon={Tags} tone="light" />
          <ActionTile href="/espace/admin/paiements" label="Commissions" description="Suivre marges, reversements et frais." icon={WalletCards} tone="light" />
          <ActionTile href="/signalement" label="Signalements" description="Voir ou creer un ticket d'erreur." icon={AlertTriangle} tone="light" />
          <ActionTile href="/profil" label="Profil" description="Modifier informations et photo de profil." icon={UserCircle} tone="light" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <SimpleChart />
        <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
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
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <StatusBoard title="Controle plateforme" items={[
          { label: "Validation vendeurs", value: "18 a traiter", tone: "amber" },
          { label: "Commandes sensibles", value: "6 alertes", tone: "amber" },
          { label: "Paiements confirmes", value: "92%", tone: "green" }
        ]} />
        <NotificationCenter role="ADMIN" />
        <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Users className="size-5 text-emerald-700" /> Regles de comptes</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-700">
            <p className="rounded-md bg-slate-50 p-3">Les clients s'inscrivent depuis S'inscrire.</p>
            <p className="rounded-md bg-slate-50 p-3">Les vendeurs et livreurs sont crees par l'admin.</p>
            <p className="rounded-md bg-slate-50 p-3">Chaque compte a un login et un mot de passe modifiable.</p>
          </div>
        </section>
        <section className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><Shield className="size-5 text-emerald-700" /> Top recommandations</h2>
          <div className="mt-4 space-y-3">{products.slice(0, 5).map((p) => <div key={p.id} className="flex justify-between text-sm"><span>{p.name}</span><strong>{p.score}%</strong></div>)}</div>
        </section>
      </div>
    </DashboardShell>
  );
}
