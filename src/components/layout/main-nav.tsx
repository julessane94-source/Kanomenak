import Link from "next/link";
import { AlertTriangle, Heart, LayoutDashboard, LogIn, ShoppingBasket, Store, Tags, UserCircle, UserPlus } from "lucide-react";

const links = [
  { href: "/", label: "Marche", icon: Store },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/panier", label: "Panier", icon: ShoppingBasket },
  { href: "/favoris", label: "Favoris", icon: Heart },
  { href: "/espace", label: "Mon espace", icon: LayoutDashboard }
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-emerald-900">
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-800 text-white shadow-sm">K</span>
          kanomenak
        </Link>
        <div className="hidden items-center rounded-xl border border-emerald-100 bg-emerald-50/70 p-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black text-slate-700 hover:bg-white hover:text-emerald-800 hover:shadow-sm">
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
          <Link href="/signalement" className="grid size-9 place-items-center rounded-lg text-amber-700 hover:bg-white hover:shadow-sm" title="Signaler"><AlertTriangle className="size-4" /></Link>
          <Link href="/profil" className="grid size-9 place-items-center rounded-lg text-emerald-800 hover:bg-white hover:shadow-sm" title="Profil"><UserCircle className="size-4" /></Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/connexion" className="grid size-10 place-items-center rounded-lg border border-emerald-100 bg-white text-slate-700 shadow-sm" title="Connexion"><LogIn className="size-4" /></Link>
          <Link href="/inscription" className="flex items-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-black text-white shadow-sm hover:bg-emerald-900"><UserPlus className="size-4" /> S'inscrire</Link>
        </div>
      </nav>
      <div className="grid grid-cols-5 border-t border-emerald-100 bg-white lg:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-bold text-slate-700">
            <link.icon className="size-4" />
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
