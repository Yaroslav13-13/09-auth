import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSessionServer } from "@/lib/api/serverApi";

const publicAuthPages = ["/sign-in", "/sign-up", "/signin", "/signup"];
const privatePrefixes = ["/notes", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // Якщо немає accessToken, але є refreshToken → оновлюємо сесію
  if (!accessToken && refreshToken) {
    try {
      const newTokens = await checkSessionServer({
        headers: { Cookie: `refreshToken=${refreshToken}` },
      });

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
      // Якщо оновлення сесії не вдалося — видаляємо токени
      const res = NextResponse.next();
      res.cookies.delete("accessToken");
      res.cookies.delete("refreshToken");
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
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
