import { CheckCircle, XCircle } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

const missions = ["KMK-0001 · Plateau", "KMK-0007 · Medina", "KMK-0012 · Almadies"];

export default function CourierMissionsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-slate-950">Missions livreur</h1>
      <div className="mt-6 grid gap-4">{missions.map((mission) => <article key={mission} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><strong>{mission}</strong><div className="flex flex-wrap gap-2"><ActionButton label="Accepter" doneLabel="Mission acceptee" icon="CheckCircle" /><ActionButton label="Refuser" doneLabel="Mission refusee" icon="XCircle" variant="outline" /></div></div></article>)}</div>
    </main>
  );
}
