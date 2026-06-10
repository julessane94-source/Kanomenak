import { ProfileForm } from "@/components/forms/profile-form";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <p className="text-sm font-black uppercase text-emerald-800">Compte kanomenak</p>
      <h1 className="mt-2 text-3xl font-black text-slate-950">Profil utilisateur</h1>
      <p className="mt-2 text-slate-700">Modifiez vos informations personnelles et ajoutez votre photo de profil.</p>
      <div className="mt-6"><ProfileForm /></div>
    </main>
  );
}
