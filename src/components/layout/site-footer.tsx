import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-900/10 kmk-premium-gradient text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-xl font-black">kanomenak</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-emerald-50">Siege : Sedhiou. Marketplace locale pour clients, vendeurs, livreurs, pharmacies et boulangeries.</p>
          <p className="mt-3 text-xs font-bold text-emerald-200">Plateforme concue par Souleymane Sane (AT-TIDIANY).</p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-emerald-50">
          <span className="flex items-center gap-2"><MapPin className="size-4 text-emerald-300" /> Sedhiou</span>
          <span className="flex items-center gap-2"><Phone className="size-4 text-emerald-300" /> 77 885 16 91 / 77 533 53 20</span>
          <span className="flex items-center gap-2"><Mail className="size-4 text-emerald-300" /> julessane94@gmail.com</span>
        </div>
      </div>
    </footer>
  );
}
