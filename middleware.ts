// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ambil token dengan secret untuk memastikan token valid & tidak dimanipulasi
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  // Cegah user yang sudah login masuk ke halaman Login/Register lagi
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Proteksi Strict untuk Admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "ADMIN") {
      // Jika bukan admin, jangan cuma redirect ke home, tapi kasih 'Access Denied'
      return NextResponse.rewrite(new URL("/403", req.url));
    }
  }

  // Proteksi Strict untuk penjual
  if (pathname.startsWith("/toko")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "PENJUAL" && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Proteksi Halaman User
  if (pathname.startsWith("/setting") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/toko/:path*",
    "/setting/:path*",
    "/login",
    "/register",
  ],
};
