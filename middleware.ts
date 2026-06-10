import { NextRequest, NextResponse } from "next/server";

const roleDashboard: Record<string, string> = {
  ADMIN: "/espace/admin",
  VENDEUR: "/espace/vendeur",
  LIVREUR: "/espace/livreur",
  CLIENT: "/espace/client"
};

const protectedPrefixes = ["/espace", "/parametres"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = request.cookies.get("kmk_session")?.value;
  const role = request.cookies.get("kmk_role")?.value || "CLIENT";

  if (!session) {
    const loginUrl = new URL("/connexion", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/espace") {
    return NextResponse.redirect(new URL(roleDashboard[role] || "/espace/client", request.url));
  }

  const ownDashboard = roleDashboard[role] || "/espace/client";
  const rolePaths = ["/espace/admin", "/espace/vendeur", "/espace/livreur", "/espace/client"];
  const requestedRolePath = rolePaths.find((path) => pathname === path || pathname.startsWith(path + "/"));

  if (requestedRolePath && requestedRolePath !== ownDashboard && role !== "ADMIN") {
    return NextResponse.redirect(new URL(ownDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/espace/:path*", "/parametres/:path*"]
};
