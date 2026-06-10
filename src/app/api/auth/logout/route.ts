import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("kmk_session");
  response.cookies.delete("kmk_role");
  return response;
}
