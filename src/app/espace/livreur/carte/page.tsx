import { MapPin, Navigation } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

export default function CourierMapPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><MapPin className="size-7 text-emerald-700" /> Carte GPS</h1>
      <section className="mt-6 min-h-[460px] rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#d1fae5,#e0f2fe)] p-6 shadow-sm">
        <div className="max-w-sm rounded-lg bg-white p-5 shadow-sm"><h2 className="font-black">Position active</h2><p className="mt-2 text-sm text-slate-600">Le branchement Leaflet/OpenStreetMap est prevu pour remplacer cette carte de demonstration.</p><div className="mt-4"><ActionButton label="Demarrer itineraire" doneLabel="Itineraire actif" icon="Navigation" /></div></div>
      </section>
    </main>
  );
}
