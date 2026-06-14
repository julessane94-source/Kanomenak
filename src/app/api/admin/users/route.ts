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
  role: z.enum(["VENDEUR", "LIVREUR"])
});

export async function POST(request: Request) {
  const session = await getSession();
  if (session.role !== "ADMIN") return NextResponse.json({ error: "Admin requis" }, { status: 403 });
  const payload = schema.parse(await request.json());
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      role: payload.role,
      password: await bcrypt.hash(payload.password, 10),
      shop: payload.role === "VENDEUR" ? {
        create: {
          name: payload.name,
          slug: payload.email.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          description: "Boutique creee par l'administration kanomenak.",
          city: "Dakar"
        }
      } : undefined
    }
  });
  return NextResponse.json({ id: user.id, role: user.role, email: user.email, mustChangePassword: true }, { status: 201 });
}
