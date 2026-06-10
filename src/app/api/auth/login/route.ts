import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  identifier: z.string().min(3),
  password: z.string().min(8)
});

function roleFromIdentifier(identifier: string) {
  const value = identifier.toLowerCase();
  if (value === "julessane94@gmail.com") return "ADMIN";
  if (value.includes("admin")) return "ADMIN";
  if (value.includes("vendeur")) return "VENDEUR";
  if (value.includes("livreur")) return "LIVREUR";
  return "CLIENT";
}

function dashboardFor(role: string) {
  return role === "ADMIN" ? "/espace/admin" : role === "VENDEUR" ? "/espace/vendeur" : role === "LIVREUR" ? "/espace/livreur" : "/espace/client";
}

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  if (payload.identifier.toLowerCase() === "julessane94@gmail.com" && payload.password !== "Baye1994@") {
    return NextResponse.json({ error: "Mot de passe admin incorrect" }, { status: 401 });
  }
  const role = roleFromIdentifier(payload.identifier);
  const response = NextResponse.json({
    success: true,
    role,
    redirectTo: dashboardFor(role)
  });

  response.cookies.set("kmk_session", `demo-${role.toLowerCase()}-session`, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  response.cookies.set("kmk_role", role, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
