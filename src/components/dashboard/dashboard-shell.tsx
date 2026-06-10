import Link from "next/link";
import { BarChart3, Settings } from "lucide-react";

export function DashboardShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#bbf7d0,transparent_34%),linear-gradient(180deg,#ecfdf5,#dcfce7)]">
      <section className="border-b border-emerald-200 bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-black uppercase text-emerald-200"><BarChart3 className="size-4" /> kanomenak workspace</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm font-semibold text-emerald-50">{subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <Link href="/parametres/securite" className="flex h-11 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm font-black text-white hover:bg-white/20"><Settings className="size-4" /> Securite</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-7">
        {children}
      </section>
    </main>
  );
}
