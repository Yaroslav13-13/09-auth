import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicAuthPages = ["/sign-in", "/sign-up", "/signin", "/signup"];
const privatePrefixes = ["/notes", "/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const hasToken = Boolean(accessToken || refreshToken);

  // Redirect logged-in users away from auth pages
  if (publicAuthPages.some((p) => pathname.startsWith(p))) {
    if (hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protect private routes
  if (privatePrefixes.some((p) => pathname.startsWith(p))) {
    if (!hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
