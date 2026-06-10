"use client";

import { useState } from "react";
import { CheckCircle, CreditCard, Eye, Heart, ImagePlus, MapPin, MessageCircle, Navigation, PackageCheck, Plus, ShieldCheck, ShoppingBag, ShoppingCart, XCircle } from "lucide-react";

const icons = {
  CheckCircle,
  CreditCard,
  Eye,
  Heart,
  ImagePlus,
  MapPin,
  MessageCircle,
  Navigation,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  XCircle
};

type IconName = keyof typeof icons;

export function ActionButton({ label, doneLabel, icon, variant = "primary", full = false }: { label: string; doneLabel?: string; icon?: IconName; variant?: "primary" | "outline"; full?: boolean }) {
  const [done, setDone] = useState(false);
  const Icon = icon ? icons[icon] : null;
  const text = done ? doneLabel || "Action effectuee" : label;
  const className = variant === "primary"
    ? "flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 font-black text-white hover:bg-emerald-800"
    : "flex h-11 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 font-black text-slate-700 hover:border-emerald-300 hover:bg-emerald-50";

  return (
    <button type="button" onClick={() => setDone(true)} className={full ? className + " w-full" : className}>
      {Icon && <Icon className="size-4" />}
      {text}
    </button>
  );
}
