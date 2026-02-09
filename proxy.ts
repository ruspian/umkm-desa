import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ambil token
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const isAuth = !!token;
  const isAdmin = token?.role === "ADMIN";

  // Tentukan halaman mana yang dikecualikan untuk maintenance
  const isMaintenancePage = pathname === "/maintenance";
  const isApiRoute = pathname.startsWith("/api");
  const isStaticFile = pathname.includes(".");

  // deklarasi maintenance
  let isMaintenanceMode = false;

  // Cek maintenance bukan file statis, bukan api, dan bukan halaman maintenance itu sendiri
  if (!isStaticFile && !isApiRoute && !isMaintenancePage) {
    try {
      // Panggil API
      const response = await fetch(new URL("/api/maintenance", req.url), {
        cache: "no-store",
      });
      const data = await response.json();

      isMaintenanceMode = data.isMaintenance;
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      isMaintenanceMode = false;
    }
  }

  // Jika maintenance dan bukan halaman maintenance dan bukan api dan bukan file statis, kembalikan ke halaman maintenance
  if (isMaintenanceMode && !isMaintenancePage && !isApiRoute && !isStaticFile) {
    // Kalo Admin bisa akses saat maintenance
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  }

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // prootksi halaman auth
  if (isAuthPage) {
    if (isAuth) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // proiteksi halaman admin
  if (pathname.startsWith("/admin")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    if (!isAdmin) return NextResponse.rewrite(new URL("/403", req.url));
  }

  // proteksi halaman toko
  if (pathname.startsWith("/toko")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    if (token.role !== "PENJUAL" && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // proteksi halaman user
  if (pathname.startsWith("/setting") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// global matcher
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
