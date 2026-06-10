import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8)
});

export async function POST(request: Request) {
  const payload = schema.parse(await request.json());
  return NextResponse.json({
    success: true,
    passwordUpdatedAt: new Date().toISOString(),
    strength: payload.newPassword.length >= 12 ? "fort" : "acceptable"
  });
}
