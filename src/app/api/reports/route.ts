import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.enum(["BUG", "PAIEMENT", "COMMANDE", "LIVRAISON", "PRODUIT", "COMPTE", "AUTRE"]),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
  pageUrl: z.string().optional(),
  reporterRole: z.string().optional()
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  return NextResponse.json({
    id: `RPT-${Date.now().toString().slice(-6)}`,
    status: "OPEN",
    createdAt: new Date().toISOString(),
    ...payload
  }, { status: 201 });
}
