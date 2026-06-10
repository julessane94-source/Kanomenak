import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  password: z.string().min(8),
  role: z.enum(["VENDEUR", "LIVREUR"])
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  return NextResponse.json({
    id: `${payload.role.toLowerCase()}_${Date.now()}`,
    createdBy: "ADMIN",
    mustChangePassword: true,
    ...payload
  }, { status: 201 });
}
