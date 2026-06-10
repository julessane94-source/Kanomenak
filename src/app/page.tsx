import { Suspense } from "react";
import { MarketView } from "@/components/market/market-view";

export default function Home() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-7xl px-4 py-10">Chargement...</main>}>
      <MarketView />
    </Suspense>
  );
}
