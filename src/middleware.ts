import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const referrer = req.headers.get("referer");

  // Allow access to odch route only if referred from /app/page
  if (url.pathname.startsWith("/odch")) {
    if (!referrer || !referrer.includes("/app/page")) {
      return NextResponse.redirect(new URL("/app/page", req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only for specific routes
export const config = {
  matcher: "/odch/:path*",
};
