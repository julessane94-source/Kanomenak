"use client";

import { Download } from "lucide-react";

export function InvoiceButton({ orderCode }: { orderCode: string }) {
  function download() {
    const content = [
      "FACTURE KANOMENAK",
      "Commande: " + orderCode,
      "Date: " + new Date().toLocaleDateString("fr-FR"),
      "Client: Client kanomenak",
      "Total: 14 000 FCFA",
      "Paiement: a la livraison"
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `facture-${orderCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={download} className="flex items-center gap-2 rounded-md border border-emerald-200 bg-white px-4 py-2 font-black text-emerald-800 hover:bg-emerald-50">
      <Download className="size-4" /> Facture
    </button>
  );
}
