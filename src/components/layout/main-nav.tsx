import Link from "next/link";
import { cookies } from "next/headers";
import { AlertTriangle, Heart, LayoutDashboard, LogIn, ShoppingBasket, Store, Tags, UserCircle, UserPlus } from "lucide-react";
import { LogoutButton } from "@/components/dashboard/logout-button";

const links = [
  { href: "/", label: "Marche", icon: Store },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/panier", label: "Panier", icon: ShoppingBasket },
  { href: "/favoris", label: "Favoris", icon: Heart },
  { href: "/espace", label: "Espace", icon: LayoutDashboard }
];

export async function MainNav() {
  const cookieStore = await cookies();
  const isConnected = Boolean(cookieStore.get("kmk_session")?.value);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-white/90 shadow-sm shadow-emerald-950/5 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 text-lg font-black tracking-tight text-emerald-900 sm:text-xl">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white shadow-sm shadow-emerald-900/20">K</span>
          <span className="truncate">kanomenak</span>
        </Link>
        <div className="hidden items-center rounded-2xl border border-emerald-100 bg-emerald-50/70 p-1.5 shadow-inner lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-black text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:text-emerald-800 hover:shadow-sm">
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
          {isConnected && (
            <>
              <Link href="/signalement" className="grid size-9 place-items-center rounded-xl text-amber-700 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm" title="Signaler"><AlertTriangle className="size-4" /></Link>
              <Link href="/profil" className="grid size-9 place-items-center rounded-xl text-emerald-800 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm" title="Profil"><UserCircle className="size-4" /></Link>
            </>
          )}
        </div>
        {isConnected ? (
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/profil" className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm font-black text-emerald-800 shadow-sm hover:-translate-y-0.5"><UserCircle className="size-4" /> Profil</Link>
            <Link href="/espace" className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-emerald-900/20 hover:-translate-y-0.5 hover:bg-emerald-900"><LayoutDashboard className="size-4" /> Espace</Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/connexion" className="grid size-10 place-items-center rounded-xl border border-emerald-100 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5" title="Connexion"><LogIn className="size-4" /></Link>
            <Link href="/inscription" className="flex items-center gap-2 rounded-xl bg-emerald-800 px-4 py-2.5 text-sm font-black text-white shadow-sm shadow-emerald-900/20 hover:-translate-y-0.5 hover:bg-emerald-900"><UserPlus className="size-4" /> S'inscrire</Link>
          </div>
        )}
      </nav>
      <div className="border-t border-emerald-100 bg-white lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex min-w-[76px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-50 bg-emerald-50/70 px-2 py-2 text-[11px] font-black text-slate-700">
              <link.icon className="size-4" />
              <span className="max-w-[72px] truncate">{link.label}</span>
            </Link>
          ))}
          {isConnected ? (
            <>
              <Link href="/profil" className="flex min-w-[76px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-100 bg-white px-2 py-2 text-[11px] font-black text-emerald-800"><UserCircle className="size-4" /><span>Profil</span></Link>
              <Link href="/signalement" className="flex min-w-[76px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-amber-100 bg-amber-50 px-2 py-2 text-[11px] font-black text-amber-800"><AlertTriangle className="size-4" /><span>Signaler</span></Link>
              <div className="min-w-[118px] shrink-0 [&_button]:h-[58px] [&_button]:w-full [&_button]:flex-col [&_button]:gap-1 [&_button]:rounded-xl [&_button]:px-2 [&_button]:py-2 [&_button]:text-[11px]">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link href="/connexion" className="flex min-w-[82px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-emerald-100 bg-white px-2 py-2 text-[11px] font-black text-slate-700"><LogIn className="size-4" /><span>Connexion</span></Link>
              <Link href="/inscription" className="flex min-w-[92px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl bg-emerald-800 px-2 py-2 text-[11px] font-black text-white"><UserPlus className="size-4" /><span>S'inscrire</span></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
