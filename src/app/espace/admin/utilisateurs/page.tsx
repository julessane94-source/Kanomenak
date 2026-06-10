import { Bike, Plus, Shield, Store, UserRound } from "lucide-react";
import { ActionButton } from "@/components/interactive/action-button";

const users = [
  { name: "Awa Boutique", role: "VENDEUR", login: "vendeur@kanomenak.com", phone: "+221 77 100 20 30", status: "Actif" },
  { name: "Moussa Livraison", role: "LIVREUR", login: "livreur@kanomenak.com", phone: "+221 76 555 40 10", status: "Actif" },
  { name: "Client Demo", role: "CLIENT", login: "client@kanomenak.com", phone: "+221 78 000 11 22", status: "Client autonome" }
];

export default function AdminUsersPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
      <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-black uppercase text-emerald-700"><Shield className="size-4" /> Administration</p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">Creer vendeur ou livreur</h1>
        <p className="mt-2 text-sm text-slate-600">Les vendeurs et livreurs sont crees uniquement par l'admin. Les clients utilisent le bouton S'inscrire.</p>
        <form className="mt-5 grid gap-3">
          {["Nom complet", "Email de connexion", "Numero de telephone", "Mot de passe temporaire"].map((label) => (
            <label key={label} className="grid gap-2 text-sm font-bold text-slate-700">
              {label}
              <input className="h-11 rounded-md border border-slate-200 px-3 outline-none" />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Role
            <select className="h-11 rounded-md border border-slate-200 px-3 outline-none">
              <option>VENDEUR</option>
              <option>LIVREUR</option>
            </select>
          </label>
          <ActionButton label="Creer le compte" doneLabel="Compte cree" icon="Plus" full />
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Utilisateurs</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr><th className="p-3">Nom</th><th className="p-3">Role</th><th className="p-3">Login</th><th className="p-3">Telephone</th><th className="p-3">Statut</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.login} className="border-t border-slate-100">
                  <td className="p-3 font-bold text-slate-950">{user.name}</td>
                  <td className="p-3"><span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1 font-bold">{user.role === "VENDEUR" ? <Store className="size-4" /> : user.role === "LIVREUR" ? <Bike className="size-4" /> : <UserRound className="size-4" />}{user.role}</span></td>
                  <td className="p-3">{user.login}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 text-emerald-700 font-bold">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
