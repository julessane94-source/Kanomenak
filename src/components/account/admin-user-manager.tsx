"use client";

import { useState } from "react";
import { Bike, KeyRound, Plus, Shield, Store, UserRound } from "lucide-react";

type UserRow = { name: string; role: "VENDEUR" | "LIVREUR" | "CLIENT"; login: string; phone: string; status: string };

const initialUsers: UserRow[] = [
  { name: "Awa Boutique", role: "VENDEUR", login: "vendeur@kanomenak.com", phone: "+221 77 100 20 30", status: "Actif" },
  { name: "Moussa Livraison", role: "LIVREUR", login: "livreur@kanomenak.com", phone: "+221 76 555 40 10", status: "Actif" },
  { name: "Client Demo", role: "CLIENT", login: "client@kanomenak.com", phone: "+221 78 000 11 22", status: "Client autonome" }
];

export function AdminUserManager() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", role: "VENDEUR" as "VENDEUR" | "LIVREUR" });
  const [message, setMessage] = useState("");

  async function createUser() {
    if (!form.name || !form.email || !form.phone || form.password.length < 8) {
      setMessage("Completez le formulaire avec un mot de passe de 8 caracteres minimum.");
      return;
    }
    const response = await fetch("/api/admin/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!response.ok) {
      setMessage("Creation impossible. Verifiez les champs.");
      return;
    }
    setUsers((current) => [{ name: form.name, role: form.role, login: form.email, phone: form.phone, status: "Mot de passe temporaire" }, ...current]);
    setForm({ name: "", email: "", phone: "", password: "", role: "VENDEUR" });
    setMessage("Compte cree. L'utilisateur devra modifier son mot de passe.");
  }

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[420px_1fr]">
      <section className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-sm font-black uppercase text-emerald-700"><Shield className="size-4" /> Administration</p>
        <h1 className="mt-2 text-2xl font-black text-slate-950">Creer vendeur ou livreur</h1>
        <form action={createUser} className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-bold text-slate-700">Nom complet<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Email de connexion<input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Numero de telephone<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Mot de passe temporaire<input value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} type="password" className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
          <label className="grid gap-2 text-sm font-bold text-slate-700">Role<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value as "VENDEUR" | "LIVREUR" })} className="h-11 rounded-md border border-slate-200 px-3 outline-none"><option>VENDEUR</option><option>LIVREUR</option></select></label>
          <button type="submit" className="flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white hover:bg-emerald-800"><Plus className="size-4" /> Creer le compte</button>
        </form>
        {message && <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{message}</p>}
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">Utilisateurs</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Nom</th><th className="p-3">Role</th><th className="p-3">Login</th><th className="p-3">Telephone</th><th className="p-3">Statut</th><th className="p-3">Actions</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.login} className="border-t border-slate-100">
                  <td className="p-3 font-bold text-slate-950">{user.name}</td>
                  <td className="p-3"><span className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-2 py-1 font-bold">{user.role === "VENDEUR" ? <Store className="size-4" /> : user.role === "LIVREUR" ? <Bike className="size-4" /> : <UserRound className="size-4" />}{user.role}</span></td>
                  <td className="p-3">{user.login}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 font-bold text-emerald-700">{user.status}</td>
                  <td className="p-3"><button type="button" onClick={() => setUsers((current) => current.map((item) => item.login === user.login ? { ...item, status: item.status === "Suspendu" ? "Actif" : "Suspendu" } : item))} className="rounded-md border border-slate-200 px-3 py-2 font-black">Activer/Suspendre</button> <button type="button" onClick={() => setMessage("Mot de passe temporaire renvoye a " + user.login)} className="rounded-md border border-emerald-200 px-3 py-2 font-black text-emerald-800"><KeyRound className="inline size-4" /> Reset</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
