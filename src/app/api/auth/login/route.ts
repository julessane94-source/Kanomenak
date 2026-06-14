import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { dashboardFor, setSessionCookies } from "@/lib/session";

const schema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const identifier = payload.identifier.toLowerCase();
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { phone: payload.identifier }] }
  });

  if (!user) {
    return NextResponse.json({ error: "Compte introuvable" }, { status: 401 });
  }

  const valid = user.password.startsWith("$2") ? await bcrypt.compare(payload.password, user.password) : payload.password === user.password;
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, role: user.role, redirectTo: dashboardFor(user.role) });
  setSessionCookies(response, user.id, user.role);
  return response;
}
