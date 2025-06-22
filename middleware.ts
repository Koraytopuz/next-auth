import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./src/auth";

type Role = "user" | "admin";

// Define protected routes and their required roles
const protectedRoutes = {
  "/dashboard": ["user", "admin"] as Role[],
  "/dashboard/admin": ["admin"] as Role[],
} as const;

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // Get the pathname from the URL
  const path = request.nextUrl.pathname;

  // If user is not logged in, redirect to login
  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access for protected routes
  for (const [route, roles] of Object.entries(protectedRoutes)) {
    if (path.startsWith(route)) {
      const userRole = session.user.role;
      if (!roles.includes(userRole)) {
        // If user doesn't have required role, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/protected/:path*",
  ]
};