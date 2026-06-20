import Link from "next/link";
import { BarChart3, Settings } from "lucide-react";

export function DashboardShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden border-b border-emerald-900/10 kmk-premium-gradient text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.22),transparent_32rem),radial-gradient(circle_at_90%_10%,rgba(250,204,21,0.13),transparent_24rem)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-7 sm:py-9">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-black uppercase text-emerald-100"><BarChart3 className="size-4" /> Nafaa workspace</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-emerald-50">{subtitle}</p>
            </div>
            <Link href="/parametres/securite" className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-sm font-black text-white hover:bg-white/20 sm:w-fit"><Settings className="size-4" /> Securite</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
        {children}
      </section>
    </main>
  );
}
