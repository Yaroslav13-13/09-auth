import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "@/lib/api/serverApi";

const authRoutes = ["/sign-in", "/sign-up"];
const privateRoutes = ["/notes", "/profile"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (accessToken && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/notes", req.url));
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await checkSessionServer();
      if (res?.data?.user) {
        const response = NextResponse.next();
        if (res.headers["set-cookie"]) {
          const cookies = res.headers["set-cookie"];
          cookies.forEach((cookie: string) => {
            const [name, value] = cookie.split("=");
            response.cookies.set(name.trim(), value.split(";")[0]);
          });
        }
        return response;
      }
    } catch (err) {
      console.error("Session refresh failed:", err);
    }
  }

  if (
    !accessToken &&
    privateRoutes.some((route) => pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/notes/:path*", "/profile/:path*", "/sign-in", "/sign-up"],
};
