import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "@/lib/api/serverApi";

const publicAuthPages = ["/sign-in", "/sign-up", "/signin", "/signup"];
const privatePrefixes = ["/notes", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let accessToken = req.cookies.get("accessToken")?.value;
  let refreshToken = req.cookies.get("refreshToken")?.value;

  // Якщо немає accessToken, але є refreshToken → оновлюємо сесію
  if (!accessToken && refreshToken) {
    const newTokens = await checkSessionServer(refreshToken);

    if (newTokens?.accessToken && newTokens?.refreshToken) {
      accessToken = newTokens.accessToken;
      refreshToken = newTokens.refreshToken;

      const res = NextResponse.next();
      res.cookies.set("accessToken", accessToken, { httpOnly: true });
      res.cookies.set("refreshToken", refreshToken, { httpOnly: true });
      return res;
    }
  }

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
