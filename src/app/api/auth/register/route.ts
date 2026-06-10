import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(6).optional(),
  password: z.string().min(8),
  provider: z.enum(["credentials", "google", "phone"]).default("credentials")
}).refine((value) => value.email || value.phone, "Email ou telephone requis");

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  const response = NextResponse.json({
    id: `client_${Date.now()}`,
    role: "CLIENT",
    redirectTo: "/espace/client",
    passwordUpdatedAt: new Date().toISOString(),
    ...payload
  }, { status: 201 });

  response.cookies.set("kmk_session", "demo-client-session", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  response.cookies.set("kmk_role", "CLIENT", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
