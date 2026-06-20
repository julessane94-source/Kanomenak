"use client";

import { useEffect, useState } from "react";
import { Bike, CheckCircle, Power } from "lucide-react";

export function CourierAvailabilityToggle() {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("Nafaa-courier-available");
    if (stored !== null) setAvailable(stored === "true");
  }, []);

  function toggle() {
    const next = !available;
    setAvailable(next);
    localStorage.setItem("Nafaa-courier-available", String(next));
    window.dispatchEvent(new CustomEvent("Nafaa-courier-status", { detail: { available: next } }));
  }

  return (
    <button type="button" onClick={toggle} className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-black shadow-sm transition sm:w-auto ${available ? "bg-emerald-800 text-white shadow-emerald-900/20 hover:bg-emerald-900" : "bg-slate-900 text-white hover:bg-slate-800"}`}>
      {available ? <CheckCircle className="size-4" /> : <Power className="size-4" />}
      {available ? "Disponible pour livraison" : "Indisponible"}
      <Bike className="size-4" />
    </button>
  );
}
