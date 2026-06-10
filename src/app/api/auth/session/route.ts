import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("kmk_session")?.value;
  const role = cookieStore.get("kmk_role")?.value || null;

  return NextResponse.json({
    authenticated: Boolean(session),
    role
  });
}
