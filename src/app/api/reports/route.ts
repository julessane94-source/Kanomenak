import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

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
  const session = await getSession();
  const report = await prisma.report.create({
    data: { ...payload, reporterId: session.userId, reporterRole: payload.reporterRole || session.role }
  });
  return NextResponse.json({ id: report.id, status: report.status, createdAt: report.createdAt }, { status: 201 });
}
