import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "@/lib/api/serverApi";

const publicAuthPages = ["/sign-in", "/sign-up", "/signin", "/signup"];
const privatePrefixes = ["/notes", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // eslint-disable-next-line prefer-const
  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const newTokens = await checkSessionServer(
        `refreshToken=${refreshToken}`
      );

      if (newTokens?.accessToken && newTokens?.refreshToken) {
        const res = NextResponse.next();
        res.cookies.set("accessToken", newTokens.accessToken, {
          httpOnly: true,
        });
        res.cookies.set("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
        });
        return res;
      }
    } catch {
      const res = NextResponse.next();
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
      return res;
    }
  }

  const hasToken = Boolean(accessToken || refreshToken);

  if (publicAuthPages.some((p) => pathname.startsWith(p))) {
    if (hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (privatePrefixes.some((p) => pathname.startsWith(p))) {
    if (!hasToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
