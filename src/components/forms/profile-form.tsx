"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";

export function ProfileForm() {
  const [photo, setPhoto] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState({ name: "Utilisateur kanomenak", email: "client@kanomenak.com", phone: "+221 77 000 00 00", city: "Dakar" });

  useEffect(() => {
    const stored = localStorage.getItem("kanomenak-profile");
    if (stored) setProfile(JSON.parse(stored));
    const storedPhoto = localStorage.getItem("kanomenak-profile-photo");
    if (storedPhoto) setPhoto(storedPhoto);
  }, []);

  function onPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const value = String(reader.result);
      setPhoto(value);
      localStorage.setItem("kanomenak-profile-photo", value);
    };
    reader.readAsDataURL(file);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem("kanomenak-profile", JSON.stringify(profile));
    setMessage("Profil mis a jour");
  }

  return (
    <form onSubmit={submit} className="grid gap-6 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="grid size-28 place-items-center overflow-hidden rounded-lg border border-emerald-100 bg-emerald-50">
          {photo ? <img src={photo} alt="Photo de profil" className="h-full w-full object-cover" /> : <Camera className="size-8 text-emerald-700" />}
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-950">Photo de profil</h2>
          <p className="mt-1 text-sm text-slate-600">Ajoutez une photo pour identifier votre compte.</p>
          <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-md bg-emerald-800 px-4 py-3 text-sm font-black text-white">
            <Camera className="size-4" /> Joindre une photo
            <input type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </label>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-slate-700">Nom complet<input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Email<input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Telephone<input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
        <label className="grid gap-2 text-sm font-bold text-slate-700">Ville<input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className="h-11 rounded-md border border-slate-200 px-3 outline-none" /></label>
      </div>
      {message && <p className="rounded-md bg-emerald-50 p-3 text-sm font-black text-emerald-800">{message}</p>}
      <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-800 font-black text-white"><Save className="size-4" /> Enregistrer le profil</button>
    </form>
  );
}
