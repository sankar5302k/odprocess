import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";

  // Protect the "/odch" route
  if (pathname.startsWith("/odch") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to login page
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/odch"], // Protect only the "/odch" route
};
