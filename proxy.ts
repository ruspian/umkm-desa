import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const isAuth = !!token;
  const role = token?.role as string | undefined;
  const isAdmin = role === "ADMIN";

  // Filter file statis dan API agar tidak terkena middleware
  const isStaticFile = pathname.includes(".") || pathname.startsWith("/_next");
  const isApiRoute = pathname.startsWith("/api");
  if (isStaticFile || isApiRoute) return NextResponse.next();

  // Logika Maintenance

  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenanceMode && !isMaintenancePage && !isAdmin) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  // Proteksi Halaman Auth
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  if (isAuthPage) {
    if (isAuth) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // Proteksi Halaman Admin
  if (pathname.startsWith("/admin")) {
    if (!isAuth) return NextResponse.redirect(new URL("/login", req.url));
    if (!isAdmin) return NextResponse.rewrite(new URL("/403", req.url));
  }

  // Proteksi Halaman Toko
  if (pathname.startsWith("/toko")) {
    if (!isAuth) return NextResponse.redirect(new URL("/login", req.url));
    if (role !== "PENJUAL" && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Proteksi Setting
  if (pathname.startsWith("/setting") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
