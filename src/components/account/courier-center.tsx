"use client";

import { useState } from "react";
import { CheckCircle, MapPin, MessageCircle, Navigation, PhoneCall, Wallet, XCircle } from "lucide-react";

const initialMissions = [
  { code: "KMK-0001", zone: "Plateau", fee: "1 500 FCFA", status: "Disponible", clientPhone: "+221770001122", lat: 14.6937, lng: -17.4441 },
  { code: "KMK-0007", zone: "Medina", fee: "2 000 FCFA", status: "Disponible", clientPhone: "+221781112233", lat: 14.6829, lng: -17.4566 },
  { code: "KMK-0012", zone: "Almadies", fee: "2 500 FCFA", status: "Disponible", clientPhone: "+221762223344", lat: 14.7468, lng: -17.5125 }
];

function openWhatsApp(phone: string, code: string) {
  window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour, je suis le livreur kanomenak pour la commande " + code)}`, "_blank", "noopener,noreferrer");
}

function openCall(phone: string) {
  window.location.href = `tel:${phone}`;
}

function openGps(lat: number, lng: number) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, "_blank", "noopener,noreferrer");
}

export function CourierMissionsCenter() {
  const [missions, setMissions] = useState(initialMissions);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-black text-slate-950">Missions livreur</h1>
      <div className="mt-6 grid gap-4">{missions.map((mission) => (
        <article key={mission.code} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div><strong>{mission.code} · {mission.zone}</strong><p className="text-sm font-semibold text-slate-500">{mission.fee} · {mission.status}</p></div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissions((current) => current.map((item) => item.code === mission.code ? { ...item, status: "Acceptee" } : item))} className="flex h-11 items-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white"><CheckCircle className="size-4" /> Accepter</button>
              <button type="button" onClick={() => setMissions((current) => current.map((item) => item.code === mission.code ? { ...item, status: "Refusee" } : item))} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><XCircle className="size-4" /> Refuser</button>
              <button type="button" onClick={() => openWhatsApp(mission.clientPhone, mission.code)} className="flex h-11 items-center gap-2 rounded-md border border-emerald-200 bg-white px-4 font-black text-emerald-800"><MessageCircle className="size-4" /> WhatsApp</button>
              <button type="button" onClick={() => openGps(mission.lat, mission.lng)} className="flex h-11 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-black text-slate-700"><MapPin className="size-4" /> Position</button>
            </div>
          </div>
        </article>
      ))}</div>
    </main>
  );
}

export function CourierMapCenter() {
  const [active, setActive] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const phone = "+221781112233";
  const lat = 14.6829;
  const lng = -17.4566;
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><MapPin className="size-7 text-emerald-700" /> Carte GPS</h1>
      <section className="mt-6 grid min-h-[460px] gap-6 rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#d1fae5,#e0f2fe)] p-6 shadow-sm lg:grid-cols-[1fr_340px]">
        <div className="relative overflow-hidden rounded-lg bg-white/60">
          <div className="absolute left-[20%] top-[25%] grid size-12 place-items-center rounded-full bg-emerald-700 text-white shadow-lg"><MapPin className="size-5" /></div>
          <div className="absolute right-[25%] top-[55%] grid size-12 place-items-center rounded-full bg-sky-700 text-white shadow-lg"><Navigation className="size-5" /></div>
          <div className="absolute left-[23%] top-[36%] h-28 w-1 rotate-[-52deg] rounded-full bg-emerald-700/50" />
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="font-black">Mission KMK-0007</h2>
          <p className="mt-2 text-sm text-slate-600">Awa Boutique vers Medina.</p>
          <div className="mt-4 grid gap-2">
            <button type="button" onClick={() => setActive(true)} className="flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white"><Navigation className="size-4" /> {active ? "Itineraire actif" : "Demarrer itineraire"}</button>
            <button type="button" onClick={() => setDelivered(true)} className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><CheckCircle className="size-4" /> {delivered ? "Livraison confirmee" : "Confirmer livraison"}</button>
            <button type="button" onClick={() => openWhatsApp(phone, "KMK-0007")} className="flex h-11 items-center justify-center gap-2 rounded-md border border-emerald-200 px-4 font-black text-emerald-800"><MessageCircle className="size-4" /> Contacter WhatsApp</button>
            <button type="button" onClick={() => openCall(phone)} className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><PhoneCall className="size-4" /> Appeler</button>
            <button type="button" onClick={() => openGps(lat, lng)} className="flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 px-4 font-black text-slate-700"><MapPin className="size-4" /> Voir position GPS</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function CourierRevenueCenter() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="flex items-center gap-2 text-3xl font-black text-slate-950"><Wallet className="size-7 text-emerald-700" /> Revenus livreur</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{["276K FCFA gagnes", "69 livraisons", "14K FCFA aujourd'hui"].map((item) => <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 text-xl font-black shadow-sm">{item}</div>)}</div>
    </main>
  );
}
