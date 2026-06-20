"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Phone, Lock, User, BadgeCheck } from "lucide-react";

export function AuthCard({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"email" | "phone" | "google">("email");
  const [info, setInfo] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = isSignup
      ? {
          name: String(form.get("name") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          password: String(form.get("password") || ""),
          provider: method === "google" ? "google" : method === "phone" ? "phone" : "credentials"
        }
      : {
          identifier: String(form.get("identifier") || ""),
          password: String(form.get("password") || "")
        };

    const response = await fetch(isSignup ? "/api/auth/register" : "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setError("Verification impossible. Controlez les informations saisies.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    const next = searchParams.get("next");
    router.push(isSignup ? "/espace/client" : next || data.redirectTo || "/espace");
    router.refresh();
  }

  return (
    <main className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section>
        <p className="text-sm font-black uppercase text-emerald-700">Nafaa secure access</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
          {isSignup ? "Creer un compte client" : "Connexion a votre espace"}
        </h1>
        <p className="mt-4 max-w-xl text-lg font-semibold text-slate-600">
          Connexion securisee par email, Google ou telephone.
        </p>
        <div className="mt-6 grid gap-3 text-sm text-slate-700">
          {[
            { label: "Email ou Google", value: "email" as const, message: "Connexion par email activee." },
            { label: "Telephone", value: "phone" as const, message: "Connexion par telephone activee." },
            { label: "Mot de passe modifiable", value: "email" as const, message: "Apres connexion, allez dans Profil puis Mot de passe." }
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setMethod(item.value);
                setInfo(item.message);
              }}
              className={`rounded-xl border p-3 text-left font-black shadow-sm transition hover:-translate-y-0.5 ${method === item.value ? "border-emerald-700 bg-emerald-50 text-emerald-900" : "border-slate-200 bg-white text-slate-700"}`}
            >
              {item.label}
            </button>
          ))}
          {info && <p className="rounded-xl bg-emerald-50 p-3 text-xs font-black text-emerald-800">{info}</p>}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-7">
        <div className="grid gap-3">
          <button
            type="button"
            onClick={() => {
              setMethod("google");
              setInfo("Connexion Google selectionnee. Continuez avec votre email Google.");
            }}
            className={`flex h-12 items-center justify-center gap-2 rounded-xl border font-black text-slate-800 ${method === "google" ? "border-emerald-700 bg-emerald-50" : "border-slate-200 bg-white"}`}
          >
            <BadgeCheck className="size-5" /> Continuer avec Google
          </button>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-xs font-bold uppercase text-slate-400">
            <span className="h-px bg-slate-200" /> ou <span className="h-px bg-slate-200" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
          {isSignup && (
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Nom complet
              <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
                <User className="size-4 text-slate-400" />
                <input name="name" className="h-11 min-w-0 flex-1 outline-none" placeholder="Votre nom" required />
              </span>
            </label>
          )}
          {isSignup ? (
            <>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Email
                <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
                  <Mail className="size-4 text-slate-400" />
                  <input name="email" className="h-11 min-w-0 flex-1 outline-none" placeholder="nom@email.com" type="email" />
                </span>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Telephone
                <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
                  <Phone className="size-4 text-slate-400" />
                  <input name="phone" className="h-11 min-w-0 flex-1 outline-none" placeholder="+221 77 000 00 00" />
                </span>
              </label>
            </>
          ) : (
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              {method === "phone" ? "Telephone" : "Email ou telephone"}
              <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
                {method === "phone" ? <Phone className="size-4 text-slate-400" /> : <Mail className="size-4 text-slate-400" />}
                <input name="identifier" className="h-11 min-w-0 flex-1 outline-none" placeholder={method === "phone" ? "+221 77 000 00 00" : "email ou telephone"} required />
              </span>
            </label>
          )}
          <label className="grid gap-2 text-sm font-bold text-slate-700">
            Mot de passe
            <span className="flex items-center gap-2 rounded-md border border-slate-200 px-3">
              <Lock className="size-4 text-slate-400" />
              <input name="password" className="h-11 min-w-0 flex-1 outline-none" placeholder="Mot de passe" type="password" required minLength={8} />
            </span>
          </label>
          {error && <p className="rounded-md bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
          <button disabled={loading} className="h-12 rounded-md bg-emerald-700 font-black text-white disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Traitement..." : isSignup ? "S'inscrire" : "Se connecter"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600">
          {isSignup ? "Vous avez deja un compte ?" : "Nouveau client ?"}{" "}
          <Link href={isSignup ? "/connexion" : "/inscription"} className="font-black text-emerald-700">
            {isSignup ? "Se connecter" : "S'inscrire"}
          </Link>
        </p>
      </section>
    </main>
  );
}
