import { ReportForm } from "@/components/forms/report-form";

export default function ReportPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <p className="text-sm font-black uppercase text-emerald-800">Support Nafaa</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Signaler une erreur</h1>
      <p className="mt-2 text-slate-700">Utilisez ce formulaire pour signaler un bug, un probleme de paiement, une commande, une livraison ou un souci de compte.</p>
      <div className="mt-6"><ReportForm /></div>
    </main>
  );
}
