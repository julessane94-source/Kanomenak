import { Suspense } from "react";
import { AuthCard } from "@/components/forms/auth-card";

export default function SignupPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-7xl px-4 py-10">Chargement...</main>}>
      <AuthCard mode="signup" />
    </Suspense>
  );
}
