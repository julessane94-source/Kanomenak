"use client";

import { useEffect, useMemo, useState } from "react";
import { Bike, MapPin, MessageCircle, PhoneCall, Star } from "lucide-react";
import { availableCouriers, formatPrice } from "@/lib/data";

type Props = {
  compact?: boolean;
  title?: string;
  city?: string;
};

function openWhatsApp(phone: string, name: string) {
  window.open(`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Bonjour " + name + ", livraison disponible sur Nafaa ?")}`, "_blank", "noopener,noreferrer");
}

function openCall(phone: string) {
  window.location.href = `tel:${phone}`;
}

export function AvailableCouriersPanel({ compact = false, title = "Livreurs disponibles", city }: Props) {
  const [selfAvailable, setSelfAvailable] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("Nafaa-courier-available");
    if (stored !== null) setSelfAvailable(stored === "true");
    const sync = (event: Event) => {
      const detail = (event as CustomEvent<{ available: boolean }>).detail;
      if (typeof detail?.available === "boolean") setSelfAvailable(detail.available);
    };
    window.addEventListener("Nafaa-courier-status", sync);
    return () => window.removeEventListener("Nafaa-courier-status", sync);
  }, []);

  const couriers = useMemo(() => {
    const visible = availableCouriers
      .map((courier) => courier.id === "courier-moussa" ? { ...courier, available: selfAvailable } : courier)
      .filter((courier) => courier.available)
      .filter((courier) => !city || courier.city.toLowerCase() === city.toLowerCase())
      .sort((a, b) => a.fee - b.fee || b.rating - a.rating);
    return visible.length ? visible : availableCouriers.filter((courier) => courier.available).sort((a, b) => a.fee - b.fee);
  }, [city, selfAvailable]);

  return (
    <section className={compact ? "rounded-lg border border-emerald-100 bg-white p-4 shadow-sm" : "rounded-xl border border-emerald-100 bg-white p-5 shadow-sm"}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className={compact ? "text-lg font-black text-slate-950" : "text-xl font-black text-slate-950"}>{title}</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">Suggestions automatiques pour chaque achat.</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800"><Bike className="size-5" /></span>
      </div>
      <div className="mt-4 grid gap-3">
        {couriers.slice(0, compact ? 2 : 4).map((courier) => (
          <article key={courier.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-black text-slate-950">{courier.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-slate-500"><MapPin className="size-3.5" /> {courier.zone} · {courier.eta}</p>
              </div>
              <strong className="rounded-md bg-white px-2 py-1 text-xs text-emerald-700">{formatPrice(courier.fee)}</strong>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1"><Star className="size-3.5 fill-amber-400 text-amber-500" /> {courier.rating}</span>
              <span>{courier.deliveries} livraisons</span>
              <button type="button" onClick={() => openWhatsApp(courier.phone, courier.name)} className="ml-auto inline-flex items-center gap-1 rounded-md bg-emerald-700 px-2.5 py-1.5 text-white"><MessageCircle className="size-3.5" /> WhatsApp</button>
              <button type="button" onClick={() => openCall(courier.phone)} className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-slate-700"><PhoneCall className="size-3.5" /> Appel</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
