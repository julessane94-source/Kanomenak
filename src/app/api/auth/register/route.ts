import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { setSessionCookies } from "@/lib/session";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  password: z.string().min(8),
  provider: z.enum(["credentials", "google", "phone"]).default("credentials")
}).refine((value) => value.email || value.phone, "Email ou telephone requis");

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const email = payload.email?.toLowerCase() || `phone-${payload.phone!.replace(/\D/g, "")}@kanomenak.local`;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Compte deja existant" }, { status: 409 });
  }
  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email,
      phone: payload.phone,
      password: await bcrypt.hash(payload.password, 10),
      role: "CLIENT",
      authProvider: payload.provider
    }
  });
  const response = NextResponse.json({ id: user.id, role: user.role, redirectTo: "/espace/client", passwordUpdatedAt: user.passwordUpdatedAt }, { status: 201 });
  setSessionCookies(response, user.id, user.role);
  return response;
}
