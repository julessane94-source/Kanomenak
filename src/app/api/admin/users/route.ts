import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  password: z.string().min(8),
  role: z.enum(["VENDEUR", "LIVREUR", "PHARMACIE", "BOULANGERIE"])
});

export async function POST(request: Request) {
  const session = await getSession();
  if (session.role !== "ADMIN") return NextResponse.json({ error: "Admin requis" }, { status: 403 });
  const payload = schema.parse(await request.json());
  const commercialType = payload.role === "PHARMACIE" || payload.role === "BOULANGERIE";
  const storedRole: "VENDEUR" | "LIVREUR" = commercialType ? "VENDEUR" : payload.role as "VENDEUR" | "LIVREUR";
  const shopDescription = payload.role === "PHARMACIE"
    ? "Pharmacie creee et verifiee par l'administration kanomenak."
    : payload.role === "BOULANGERIE"
      ? "Boulangerie creee et verifiee par l'administration kanomenak."
      : "Boutique creee par l'administration kanomenak.";
  const userData: any = {
    name: payload.name,
    email: payload.email.toLowerCase(),
    phone: payload.phone,
    role: storedRole,
    accountType: payload.role,
    password: await bcrypt.hash(payload.password, 10),
    shop: storedRole === "VENDEUR" ? {
      create: {
        name: payload.name,
        slug: payload.email.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: shopDescription,
        city: "Dakar"
      }
    } : undefined
  };
  const user = await prisma.user.create({
    data: userData
  });
  return NextResponse.json({ id: user.id, role: user.role, accountType: (user as any).accountType || payload.role, email: user.email, mustChangePassword: true }, { status: 201 });
}
