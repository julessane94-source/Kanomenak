"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Filter, MessageSquare, Search, ShieldCheck, XCircle } from "lucide-react";

const initialReports = [
  { id: "RPT-1024", title: "Paiement non confirme", role: "CLIENT", category: "PAIEMENT", priority: "URGENT", status: "Ouvert", owner: "Support", note: "Client attend confirmation Wave." },
  { id: "RPT-1025", title: "Produit avec mauvais prix", role: "VENDEUR", category: "PRODUIT", priority: "HIGH", status: "En cours", owner: "Qualite", note: "Verifier catalogue vendeur." },
  { id: "RPT-1026", title: "GPS mission bloque", role: "LIVREUR", category: "LIVRAISON", priority: "NORMAL", status: "Ouvert", owner: "Dispatch", note: "Itineraire non demarre." }
];

export function AdminReportCenter() {
  const [reports, setReports] = useState(initialReports);
  const [selected, setSelected] = useState(initialReports[0]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("TOUS");
  const [log, setLog] = useState(["Signalements charges."]);
  const visibleReports = useMemo(() => reports.filter((report) => {
    const matchQuery = [report.id, report.title, report.role, report.category, report.priority].join(" ").toLowerCase().includes(query.toLowerCase());
    const matchStatus = status === "TOUS" || report.status === status;
    return matchQuery && matchStatus;
  }), [reports, query, status]);

  function updateReport(id: string, patch: Partial<(typeof initialReports)[number]>, message: string) {
    setReports((current) => current.map((report) => report.id === id ? { ...report, ...patch } : report));
    setSelected((current) => current.id === id ? { ...current, ...patch } : current);
    setLog((current) => [message, ...current].slice(0, 6));
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-black uppercase text-emerald-700"><ShieldCheck className="size-4" /> Support admin</p>
            <h1 className="mt-2 flex items-center gap-2 text-3xl font-black text-slate-950"><AlertTriangle className="size-7 text-emerald-700" /> Signalements</h1>
          </div>
          <div className="grid gap-2 sm:grid-cols-[1fr_150px]">
            <label className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
              <Search className="size-4 text-slate-400" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher" className="w-full outline-none" />
            </label>
            <label className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
              <Filter className="size-4 text-slate-400" />
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full bg-transparent outline-none"><option>TOUS</option><option>Ouvert</option><option>En cours</option><option>Resolue</option><option>Clos</option></select>
            </label>
          </div>
        </div>
        <div className="mt-6 grid gap-4">
          {visibleReports.map((report) => (
            <article key={report.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <button type="button" onClick={() => setSelected(report)} className="text-left">
                  <h2 className="font-black">{report.id} · {report.title}</h2>
                  <p className="text-sm font-semibold text-slate-500">{report.role} · {report.category} · {report.priority} · {report.status}</p>
                </button>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => updateReport(report.id, { status: "En cours", owner: "Admin" }, report.id + " pris en charge.")} className="flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white"><Clock className="size-4" /> Traiter</button>
                  <button type="button" onClick={() => updateReport(report.id, { status: "Resolue", note: "Solution communiquee a l'utilisateur." }, report.id + " marque resolu.")} className="flex h-11 items-center gap-2 rounded-md border border-emerald-200 px-4 font-black text-emerald-800"><CheckCircle className="size-4" /> Resoudre</button>
                  <button type="button" onClick={() => updateReport(report.id, { status: "Clos" }, report.id + " cloture.")} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><XCircle className="size-4" /> Cloturer</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-black text-slate-950"><MessageSquare className="size-5 text-emerald-700" /> Ticket actif</h2>
        <div className="mt-4 rounded-md bg-slate-50 p-4">
          <strong>{selected.id}</strong>
          <p className="mt-1 text-sm font-semibold text-slate-600">{selected.title}</p>
          <p className="mt-2 text-sm text-slate-600">Responsable : {selected.owner}</p>
          <p className="mt-3 rounded-md bg-white p-3 text-sm font-bold text-slate-700">{selected.note}</p>
        </div>
        <h3 className="mt-5 text-sm font-black uppercase text-slate-500">Journal</h3>
        <div className="mt-3 grid gap-2">{log.map((item) => <p key={item} className="rounded-md bg-emerald-50 p-2 text-xs font-bold text-emerald-800">{item}</p>)}</div>
      </aside>
    </main>
  );
}
