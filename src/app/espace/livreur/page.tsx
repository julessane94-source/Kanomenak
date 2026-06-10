import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ActionTile } from "@/components/dashboard/action-tile";
import { ActionButton } from "@/components/interactive/action-button";
import { StatusBoard } from "@/components/dashboard/status-board";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { courierKpis } from "@/lib/data";
import { AlertTriangle, CheckCircle, Clock, History, MapPin, Navigation, Route, Settings, UserCircle, Wallet } from "lucide-react";

const missions = [
  { code: "KMK-0001", from: "Awa Boutique", to: "Plateau, Dakar", fee: "1 500 FCFA" },
  { code: "KMK-0007", from: "Tech Medina", to: "Medina", fee: "2 000 FCFA" },
  { code: "KMK-0012", from: "Eco Maison", to: "Almadies", fee: "2 500 FCFA" }
];

export default function CourierDashboard() {
  return (
    <DashboardShell title="Tableau de bord livreur" subtitle="Missions, itineraire, revenus, historique, position GPS et confirmation de livraison.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{courierKpis.map((kpi) => <KpiCard key={kpi.label} kpi={kpi} />)}</div>

      <section className="mt-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-950">Actions livreur</h2>
            <p className="text-sm font-semibold text-slate-600">Boutons reserves au suivi de livraison et a la position GPS.</p>
          </div>
          <div className="hidden rounded-md bg-emerald-800 px-4 py-3 text-sm font-black text-white md:block">Statut disponible</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ActionTile href="/espace/livreur/missions" label="Voir missions" description="Accepter ou refuser les livraisons disponibles." icon={CheckCircle} />
          <ActionTile href="/espace/livreur/carte" label="Carte GPS" description="Partager la position et demarrer l'itineraire." icon={MapPin} tone="light" />
          <ActionTile href="/espace/livreur/carte" label="Itineraire" description="Optimiser la route de livraison active." icon={Route} tone="light" />
          <ActionTile href="/espace/livreur/revenus" label="Revenus" description="Suivre gains, courses et paiements." icon={Wallet} tone="light" />
          <ActionTile href="/parametres/securite" label="Mot de passe" description="Modifier les acces du compte livreur." icon={Settings} tone="light" />
          <ActionTile href="/signalement" label="Signaler erreur" description="Declarer un souci de mission ou GPS." icon={AlertTriangle} tone="light" />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-h-80 rounded-lg border border-emerald-100 bg-[linear-gradient(135deg,#d1fae5,#e0f2fe)] p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">Carte des missions</h2>
          <p className="mt-2 text-sm text-slate-600">Zone Dakar · geolocalisation GPS · integration Leaflet/OpenStreetMap prete.</p>
          <div className="mt-8 grid gap-3">{missions.map((mission) => <div key={mission.code} className="rounded-lg bg-white/90 p-3 text-sm shadow-sm"><div className="flex justify-between gap-3"><strong>{mission.code}</strong><span className="font-bold text-emerald-700">{mission.fee}</span></div><p className="mt-1 text-slate-600">{mission.from} vers {mission.to}</p></div>)}</div>
        </div>
        <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black text-slate-950">Mission active</h2>
          <div className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">KMK-0007 · En route vers Medina</div>
          <div className="mt-4 grid gap-2">
            <ActionButton label="Demarrer itineraire" doneLabel="Itineraire demarre" icon="Navigation" full />
            <ActionButton label="Confirmer livraison" doneLabel="Livraison confirmee" icon="CheckCircle" variant="outline" full />
          </div>
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatusBoard title="Suivi livreur" items={[{ label: "Mission active", value: "KMK-0007", tone: "blue" }, { label: "Livraisons en retard", value: "1", tone: "amber" }, { label: "Position partagee", value: "Active", tone: "green" }]} />
        <NotificationCenter role="LIVREUR" />
        <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"><Clock className="size-5 text-emerald-700" /><h3 className="mt-3 font-black">Ponctualite</h3><p className="text-sm text-slate-600">93% des livraisons dans les delais.</p></div>
        <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"><Wallet className="size-5 text-emerald-700" /><h3 className="mt-3 font-black">Paiements</h3><p className="text-sm text-slate-600">Retraits suivis par mission.</p></div>
        <div className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"><History className="size-5 text-emerald-700" /><h3 className="mt-3 font-black">Historique</h3><p className="text-sm text-slate-600">Courses archivees avec preuve.</p></div>
      </section>
    </DashboardShell>
  );
}
