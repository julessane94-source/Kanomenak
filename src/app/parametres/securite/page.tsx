import { KeyRound, ShieldCheck } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

export default function SecuritySettingsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <p className="flex items-center gap-2 text-sm font-black uppercase text-emerald-700"><ShieldCheck className="size-4" /> Securite</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Modifier le mot de passe</h1>
      <p className="mt-2 text-slate-600">Tous les comptes kanomenak disposent d'un mot de passe personnel modifiable depuis cet espace.</p>

      <form className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {["Mot de passe actuel", "Nouveau mot de passe", "Confirmer le nouveau mot de passe"].map((label) => (
          <label key={label} className="grid gap-2 text-sm font-bold text-slate-700">
            {label}
            <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
              <KeyRound className="size-4 text-slate-400" />
              <input className="h-11 min-w-0 flex-1 outline-none" type="password" />
            </span>
          </label>
        ))}
        <ActionButton label="Mettre a jour" doneLabel="Mot de passe mis a jour" icon="ShieldCheck" full />
      </form>
    </main>
  );
}
