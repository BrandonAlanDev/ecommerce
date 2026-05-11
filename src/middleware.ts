import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const { nextUrl } = req;

  // API AUTH
  const isApiAuthRoute =
    nextUrl.pathname.startsWith("/api/auth");

  // AUTH ROUTES
  const isAuthRoute = [
    "/login",
    "/register",
  ].includes(nextUrl.pathname);

  // ADMIN ROUTES
  const isGestionRoute = [
    "/dashboard",
    "/provider",
    "/sizes",
    "/movements",
    "/categories",
  ].some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // PUBLIC ROUTES
  const publicRoutes = [
    "/",
    "/productos",
  ];

  const isPublicRoute = publicRoutes.includes(
    nextUrl.pathname
  );

  // IGNORE AUTH API
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // LOGIN / REGISTER
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL("/", nextUrl)
      );
    }

    return NextResponse.next();
  }

  // ADMIN
  if (isGestionRoute) {
    if (!isLoggedIn) {
      return Response.redirect(
        new URL("/login", nextUrl)
      );
    }

    if (userRole !== "ADMIN") {
      return Response.redirect(
        new URL("/", nextUrl)
      );
    }
  }

  // PRIVATE ROUTES
  if (!isPublicRoute && !isLoggedIn) {
    return Response.redirect(
      new URL("/login", nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};